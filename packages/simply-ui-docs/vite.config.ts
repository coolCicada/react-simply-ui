import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reads from './vite-plugins/reads';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    reads(path.resolve() + '/src')
  ]
});
