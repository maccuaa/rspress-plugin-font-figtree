# rspress-plugin-font-figtree

Use Figtree as the default font in your Rspress website.

[![npm version](https://img.shields.io/npm/v/rspress-plugin-font-figtree?style=flat-square)](https://www.npmjs.com/package/rspress-plugin-font-figtree)
[![license](https://img.shields.io/github/license/maccuaa/rspress-plugin-font-figtree?style=flat-square)](https://github.com/maccuaa/rspress-plugin-font-figtree/blob/main/LICENSE)

## Features

- 🚀 Automatic font loading via [@fontsource-variable/figtree](https://fontsource.org/fonts/figtree)
- ⚡ Smart preloading to prevent FOUT (Flash of Unstyled Text)
- 🎨 Variable font support for flexible typography
- 📦 Zero configuration required

## About

Figtree is a clean yet friendly geometric sans serif font designed for usage in web and mobile apps. Its versatile nature makes it suitable for both body text and headings, with a variable font that offers flexible weight adjustments.

See [Google Fonts - Figtree](https://fonts.google.com/specimen/Figtree/about) for more details.

## Installation

Install the plugin as a dev dependency:

```bash
# npm
npm add rspress-plugin-font-figtree -D

# bun
bun add rspress-plugin-font-figtree -D

# pnpm
pnpm add rspress-plugin-font-figtree -D

# yarn
yarn add rspress-plugin-font-figtree -D
```

## Usage

Add the plugin to your `rspress.config.ts`:

```ts
import { defineConfig } from "rspress/config";
import { pluginFontFigtree } from "rspress-plugin-font-figtree";

export default defineConfig({
  plugins: [pluginFontFigtree()],
});
```

That's it! Figtree will now be used as the default font throughout your Rspress site.

## How It Works

This plugin automatically:

1. **Loads the Figtree variable font** from `@fontsource-variable/figtree`
2. **Applies custom CSS styling** to set Figtree as the default font family
3. **Configures font preloading** to ensure `.woff2` files load immediately, preventing font flickering

## Requirements

- **Rspress**: `^1.0.0` or higher
- **Node.js**: `^18.0.0` or higher

## Troubleshooting

### Fonts not loading

If fonts aren't appearing, ensure that:

- The plugin is properly imported and added to the `plugins` array
- Your build completed successfully without errors
- Check browser DevTools Network tab to verify font files are loading

### Font flickering (FOUT)

If you see a flash of unstyled text, the preloading configuration may not be working. This is rare but can happen if:

- You're using a custom build configuration that overrides the plugin's settings
- There's a version mismatch with Rspress

## Development

To contribute or test locally:

```bash
# Clone the repository
git clone https://github.com/maccuaa/rspress-plugin-font-figtree.git
cd rspress-plugin-font-figtree

# Install dependencies
bun install

# Build the plugin
bun run build

# Run in watch mode
bun run dev

# Run linting
bun run lint
```

## Related

Looking for other font plugins? Check out:

- [rspress-plugin-font-open-sans](https://github.com/rspress-contrib/rspress-plugin-font-open-sans)

## License

MIT © [Andrew MacCuaig](https://github.com/maccuaa)
