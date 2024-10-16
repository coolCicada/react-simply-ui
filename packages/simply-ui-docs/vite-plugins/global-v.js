import fs from 'fs';
import path from 'path';

export default function injectGlobalVariablePlugin(src) {
    function getContent() {
        const componentsDir = path.resolve(__dirname, src);
        const source = {};
        // 递归读取目录中的所有文件
        const readDirectory = (dir) => {
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
                const pathName = path.join(dir, file);
                const key = dir.split(componentsDir)[1];
                if (fs.statSync(pathName).isDirectory()) {
                    readDirectory(pathName);
                } else if (pathName.endsWith('.tsx')) { // 只读取 .tsx 文件
                    const content = fs.readFileSync(pathName, 'utf-8');
                    source[key] = { ...source[key], code: content };
                } else if (file.endsWith('.json')) {
                    const content = JSON.parse(fs.readFileSync(pathName, 'utf-8'));
                    source[key] = { ...source[key], info: content };
                }
            });
        };
        readDirectory(componentsDir);
        return source;
    }
    return {
        name: 'vite:inject-global-variable',
        // 生产环境注入
        renderChunk(code) {
            const globalVariableCode = `globalThis.componentSource = ${JSON.stringify(getContent(), null, 4)};`;
            return `${globalVariableCode}\n${code}`;
        },
        // dev环境注册到 html 里
        transformIndexHtml(html) {
            // 定义你想注入的全局变量
            const globalVariableCode = `<script>
                globalThis.componentSource = ${JSON.stringify(getContent(), null, 4)}
            </script>`;

            // 将脚本插入到 <head> 标签之前
            return html.replace(
                /<\/head>/,
                `${globalVariableCode}\n</head>`
            );
        },
        // configResolved(config) {
        //     // 开发环境下设定标志位
        //     if (config.command === 'serve') {
        //         isInjected = false;
        //     }
        // },
        // transform(code, id) {
        //     // 只注入到你需要的模块中，或者可以添加其他条件过滤
        //     console.log('transform', id);
        //     if (id.endsWith('.tsx')) {
        //         const globalVariableCode = `globalThis.componentSource = ${JSON.stringify(getContent(), null, 2)};\n`;
        //         return `${globalVariableCode}${code}`;
        //     }
        //     return code;
        // },
    };
}