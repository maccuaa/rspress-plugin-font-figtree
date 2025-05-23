import path from "node:path";
import type { RspressPlugin } from "@rspress/shared";

export const pluginFontFigtree = (): RspressPlugin => {
  return {
    name: "plugin-font-figtree",
    builderConfig: {
      source: {
        preEntry: [
          path.join(
            __dirname,
            "..",
            "node_modules",
            "@fontsource",
            "figtree",
            "index.css",
          ),
        ],
      },
      performance: {
        // Preload fonts to avoid flickering caused by fonts swap
        preload: {
          type: "all-chunks",
          include: [/figtree\-.*\.woff2?/],
        },
      },
    },
  };
};
