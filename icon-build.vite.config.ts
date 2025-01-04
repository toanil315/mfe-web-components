import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: ["icon-src/index.ts"],
      output: [
        {
          dir: "build",
          format: "esm",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: ({ name: fileName }) => {
            return `${fileName}.js`;
          },
        },
      ],
    },
  },
  plugins: [dts()],
});
