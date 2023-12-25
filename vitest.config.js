import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "../utils/**/*",
    ],
    // coverage: {
    //   enabled: true,
    // },
    setupFiles: ["./.test/setup.js"],
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
