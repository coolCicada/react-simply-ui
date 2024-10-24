import { defineConfig } from "vite";
import mdx from '@mdx-js/rollup';
import codeImport from 'remark-code-import';
import react from "@vitejs/plugin-react";
import dts from 'vite-plugin-dts';
import cssPrefixPlugin from './vite-plugins/prefix-plugin';
import path from "path";
import mdxPlugin from './vite-plugins/mdx-plugin';

export default defineConfig({
  plugins: [
    {enforce: 'pre', ...mdx({/* jsxImportSource: …, otherOptions… */remarkPlugins: [codeImport, mdxPlugin]})},
    react(),
    dts(),
    cssPrefixPlugin({
      filePattern: '/src/markdown',
      prefix: '.ls-only'
    })
  ],
  build: {
    outDir: "dist", // 指定输出目录
    lib: {
      entry: "src/main.tsx", // 入口文件
      name: "MyComponentLibrary", // 库的名称
      fileName: (format) => `${format}/index.js`, // 输出文件名
      formats: ['umd', 'es']
    },
    rollupOptions: {
      // 确保外部化处理那些不想打包的依赖
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 '@' 指向 'src' 目录
    },
  },
});
