import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RspressPlugin } from "@rspress/shared";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export const pluginFontFigtree = (): RspressPlugin => {
  return {
    name: "plugin-font-figtree",
    builderConfig: {
      source: {
        preEntry: [
          require.resolve("@fontsource-variable/figtree/index.css"),
          path.join(currentDirectory, "../static/figtree.css"),
        ],
      },
      performance: {
        // Preload fonts to avoid flickering caused by fonts swap
        preload: {
          type: "all-chunks",
          include: [/figtree-.*\.woff2?/],
        },
      },
    },
  };
};
