import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    passWithNoTests: true,
    globals: true,
    environment: "jsdom",
    include: ["**/(*.)?{test}.?(c|m)[jt]s?(x)"],
    // setupFiles: ['../.test/setup.js'],
  },
});
