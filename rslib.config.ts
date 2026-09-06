import { defineConfig } from "@rslib/core";
import { pluginPublint } from "rsbuild-plugin-publint";

export default defineConfig({
  format: "esm",
  syntax: "es2021",
  dts: true,
  output: {
    target: "node",
  },
  plugins: [
    pluginPublint({
      enable: Boolean(process.env.CI),
    }),
  ],
});
