import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from 'vite-plugin-dts';

export default defineConfig({
  define: {
    __dirname: JSON.stringify(path.resolve()),
  },
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // 设置为你的入口文件
      name: "MyReactLibrary", // 库的名称
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ["react", "react-dom"], // 排除这些外部依赖
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
