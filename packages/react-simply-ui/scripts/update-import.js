import fs from 'fs';
import path from 'path';

const dirPath = path.resolve('dist/es'); // 源代码目录
const distPath = path.resolve('dist/es'); // 输出目录

// 递归遍历文件夹
const processDirectory = (directory) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath); // 递归处理子目录
    } else if (filePath.endsWith('.js')) {
      processFile(filePath); // 处理 TypeScript 文件
    }
  }
};

// 处理 TypeScript 文件
const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 替换 .less 为 .css
  content = content.replace(/\.less/g, '.css');

  fs.writeFileSync(filePath, content, 'utf8');
};

// 启动处理
processDirectory(dirPath);
