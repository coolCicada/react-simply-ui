import fs from 'fs';
import path from 'path';

export default function injectGlobalVariablePlugin(src) {
    function getContent() {
        const componentsDir = path.resolve(__dirname, src);
        const sources = {};

        // 递归读取目录中的所有文件
        const readDirectory = (dir) => {
            const key = '.' + dir.split(src)[1];
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // 如果是目录，递归调用
                    readDirectory(filePath);
                } else if (file.endsWith('.tsx')) { // 只读取 .tsx 文件
                    const origin = sources[key];
                    const content = fs.readFileSync(filePath, 'utf-8');
                    sources[key] = { ...origin, content };
                } else if (file.endsWith('.json')) {
                    const v = sources[key];
                    const meta = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    sources[key] = { ...v, meta };
                }
            });
        };

        readDirectory(componentsDir);

        return sources;
    }
    return {
        name: 'vite:inject-global-variable',
        // 生产环境注入
        renderChunk(code) {
            const globalVariableCode = `globalThis.componentSource = ${JSON.stringify(getContent(), null, 2)};`;
            return `${globalVariableCode}\n${code}`;
        },
        // configResolved(config) {
        //     // 开发环境下设定标志位
        //     if (config.command === 'serve') {
        //         isInjected = false;
        //     }
        // },
        transform(code, id) {
            // 只注入到你需要的模块中，或者可以添加其他条件过滤
            if (id.endsWith('.tsx')) {
                console.log('transform', id);
                const globalVariableCode = `globalThis.componentSource = ${JSON.stringify(getContent(), null, 2)};\n`;
                return `${globalVariableCode}${code}`;
            }
            return code;
        },
    };
}