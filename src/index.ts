import { fileURLToPath } from "node:url";
import type { RspressPlugin } from "@rspress/shared";

export const pluginFontFigtree = (): RspressPlugin => {
  return {
    name: "plugin-font-figtree",
    builderConfig: {
      source: {
        preEntry: [
          fileURLToPath(
            new URL(
              "../../@fontsource-variable/figtree/index.css",
              import.meta.url,
            ),
          ),
          fileURLToPath(new URL("../static/figtree.css", import.meta.url)),
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
