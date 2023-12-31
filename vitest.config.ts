import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      exclude: /\.stories\.(t|j)sx?$/,
      include: "**/*.tsx",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
  },
});