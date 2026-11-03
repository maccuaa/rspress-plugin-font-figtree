import { defineConfig } from "@rspress/core";
import { pluginFontFigtree } from "../../dist/index.js";

export default defineConfig({
  root: "docs",
  plugins: [pluginFontFigtree()],
});
