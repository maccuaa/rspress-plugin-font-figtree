import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RspressPlugin } from "@rspress/core";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export const pluginFontFigtree = (): RspressPlugin => {
  return {
    name: "plugin-font-figtree",
    builderConfig: {
      source: {
        preEntry: [
          require.resolve("@fontsource-variable/figtree/index.css"),
          require.resolve("@fontsource-variable/figtree/wght-italic.css"),
          path.join(currentDirectory, "../static/figtree.css"),
        ],
      },
      performance: {
        // Preload only the main upright subset to avoid flickering caused by font swap.
        // The other subsets (Latin Extended, italics) are fetched on demand.
        preload: {
          type: "all-chunks",
          include: [/figtree-latin-wght-normal.*\.woff2/],
        },
      },
    },
  };
};
