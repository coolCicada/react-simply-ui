import fs from 'fs';
import path from 'path';

function extractSourcesPlugin(src) {
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
        name: 'vite-plugin-extract-sources',
        writeBundle(options) {
            // 使用 Vite 的输出目录
            const outputDir = options.dir || 'dist';

            // 将源码写入 JSON 文件
            const outputPath = path.resolve(outputDir, 'component-sources.json');
            fs.writeFileSync(outputPath, JSON.stringify(getContent(), null, 2), 'utf-8');
        },
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/component-sources.json') {
                    // 返回 JSON 响应
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(getContent(), null, 2));
                } else {
                    next();
                }
            });
        },
    };
}

export default extractSourcesPlugin;
