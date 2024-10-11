import fs from 'fs';
import path from 'path';
import less from 'less';

const srcDir = './src'; // 源文件夹
const distDir = './dist/es'; // 目标文件夹

// 确保目标文件夹存在
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// 递归读取文件夹中的所有 LESS 文件
function compileLessFiles(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('读取目录失败:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file.name);

            if (file.isDirectory()) {
                // 如果是文件夹，递归调用
                compileLessFiles(filePath);
            } else if (path.extname(file.name) === '.less') {
                const cssFilePath = path.join(distDir, path.relative(srcDir, filePath)).replace('.less', '.css');

                // 确保目标子目录存在
                fs.mkdirSync(path.dirname(cssFilePath), { recursive: true });

                // 读取 LESS 文件并编译
                fs.readFile(filePath, 'utf8', (err, lessContent) => {
                    if (err) {
                        console.error('读取 LESS 文件失败:', err);
                        return;
                    }

                    less.render(lessContent, (err, output) => {
                        if (err) {
                            console.error('编译 LESS 文件失败:', err);
                            return;
                        }

                        // 将生成的 CSS 写入文件
                        fs.writeFile(cssFilePath, output.css, (err) => {
                            if (err) {
                                console.error('写入 CSS 文件失败:', err);
                            } else {
                                console.log(`成功编译: ${filePath} -> ${cssFilePath}`);
                            }
                        });
                    });
                });
            }
        });
    });
}

// 开始编译
compileLessFiles(srcDir);
