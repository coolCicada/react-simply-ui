// const prefixSpecificFiles = (prefix) => {
//   return (root, result) => {
//     const filePath = result.opts.from; // 获取当前处理的文件路径

//     // 仅对特定文件应用前缀
//     if (filePath.includes('src/markdown.less')) { // 替换为你的特定文件
//       return prefixSelector({ 
//         prefix, 
//         transform: (prefix, selector) => `${prefix} ${selector}` 
//       })(root, result);
//     }
//   };
// };

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 'postcss-prefix-selector': prefixSpecificFiles('.markdown'), 
  },
}
