# rspress-plugin-font-figtree

Use Figtree as the default font in your Rspress website.

<!-- <p>
  <a href="https://npmjs.com/package/rspress-plugin-font-open-sans">
   <img src="https://img.shields.io/npm/v/rspress-plugin-font-open-sans?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
</p> -->

## About

Figtree is a clean yet friendly geometric sans serif font for usage in web and mobile apps.

See [Google Fonts - Figtree](https://fonts.google.com/specimen/Figtree/about)

## Usage

Install:

```bash
npm add rspress-plugin-font-figtree -D
```

Add plugin to your `rspress.config.ts`:

```ts
// rspress.config.ts
import { pluginFontFigtree } from "rspress-plugin-font-figtree";

export default {
  plugins: [pluginFontFigtree()],
};
```
