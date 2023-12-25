import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "utils"],
    // setupFiles: ['../.test/setup.js'],
  },
});
