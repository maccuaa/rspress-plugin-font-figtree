import { defineConfig } from "@rspress/core";
import { pluginFontFigtree } from "../../dist/index.js";

// Mirrors the "Preloading more subsets" recipe in the README
export default defineConfig({
  root: "docs",
  outDir: "doc_build_preload_ext",
  plugins: [pluginFontFigtree()],
  builderConfig: {
    performance: {
      preload: { include: [/figtree-latin-ext-wght-normal/] },
    },
  },
});
