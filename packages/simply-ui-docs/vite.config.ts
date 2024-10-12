import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reads from './vite-plugins/reads';
import globalV from './vite-plugins/global-v';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    reads(path.resolve() + '/src'),
    globalV(path.resolve() + '/src')
  ],
  build: {
    outDir: "dist", // 指定输出目录
    lib: {
      entry: "src/index.tsx", // 入口文件
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
});
