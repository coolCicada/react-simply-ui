// src/global.d.ts
export {};

declare global {
  interface Window {
    componentSource: any;  // 根据你实际的类型定义，比如 string、object 等
  }
}
