import postcss from 'postcss';
import prefixer from 'postcss-prefix-selector';

const prefixCssPlugin = (options) => {
  return {
    name: 'vite-plugin-prefix-css',
    transform(css, id) {
      // 检查当前文件路径是否匹配
      if (id.includes(options.filePattern)) {
        return postcss([
          prefixer({
            prefix: options.prefix,
            transform: (prefix, selector) => `${prefix} ${selector}`,
          }),
        ])
          .process(css, { from: id })
          .then(result => {
            return {
              code: result.css,
              map: result.map, // 如果需要 source map
            };
          });
      }
      return null; // 返回 null 以使用默认处理
    },
  };
};

export default prefixCssPlugin;
