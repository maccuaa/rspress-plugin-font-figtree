import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RspressPlugin } from "@rspress/shared";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pluginFontFigtree = (): RspressPlugin => {
  return {
    name: "plugin-font-figtree",
    builderConfig: {
      source: {
        preEntry: [
          join(
            __dirname,
            "..",
            "..",
            "@fontsource-variable",
            "figtree",
            "index.css",
          ),
          join(__dirname, "..", "static", "figtree.css"),
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
