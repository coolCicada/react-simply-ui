import fs from 'fs';
import path from 'path';

export default function injectGlobalVariablePlugin(src) {
    function getContent() {
        const componentsDir = path.resolve(__dirname, src);

        // 递归读取目录中的所有文件
        const readDirectory = (dir) => {
            const sources = [];
            const key = dir.split(src)[1];
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
                let source = { name: file, key };
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // 如果是目录，递归调用
                    source.type = 'dir';
                    source.children = readDirectory(filePath);
                } else if (file.endsWith('.tsx')) { // 只读取 .tsx 文件
                    const content = fs.readFileSync(filePath, 'utf-8');
                    source.type = 'tsx';
                    source.content = content;
                } else if (file.endsWith('.json')) {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    source.type = 'json';
                    source.content = content;
                } else {
                    source = null;
                }
                if (source) sources.push(source);
            });
            return sources;
        };

        return readDirectory(componentsDir);
    }
    return {
        name: 'vite:inject-global-variable',
        // 生产环境注入
        renderChunk(code) {
            const globalVariableCode = `globalThis.componentSource = ${JSON.stringify(getContent(), null, 2)};`;
            return `${globalVariableCode}\n${code}`;
        },
        // dev环境注册到 html 里
        transformIndexHtml(html) {
            // 定义你想注入的全局变量
            const globalVariableCode = `<script>
                globalThis.componentSource = ${JSON.stringify(getContent())}
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