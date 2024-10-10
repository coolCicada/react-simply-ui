import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src',
          dest: ''
        }
      ]
    })
  ],
  build: {
    outDir: "dist", // 指定输出目录
    lib: {
      entry: "src/index.ts", // 入口文件
      name: "MyComponentLibrary", // 库的名称
      fileName: (format) => `${format}/index.js`, // 输出文件名
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
