/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vitestの設定を追加
  test: {
    globals: true, // describe, it, expect などをグローバルで使用可能に
    environment: "jsdom", // React コンポーネントのテストのため
    // setupFiles: "./src/setupTests.ts", // テスト実行前のセットアップファイル（オプション）
  },
});
