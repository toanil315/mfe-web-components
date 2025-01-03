import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "mfe-components",
      fileName: "mfe-components",
      formats: ["es", "cjs"],
    },
  },
});
