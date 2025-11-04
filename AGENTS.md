# AGENTS.md

## Project Overview

This is an Rspress plugin that integrates the Figtree font family into Rspress websites. The plugin handles font loading, preloading, and CSS configuration automatically.

**Repository**: [maccuaa/rspress-plugin-font-figtree](https://github.com/maccuaa/rspress-plugin-font-figtree)

## Tech Stack

- **Language**: TypeScript
- **Build Tool**: Rslib
- **Package Manager**: npm/bun
- **Linter/Formatter**: Biome
- **Font Source**: @fontsource-variable/figtree
- **Target Framework**: Rspress

## Project Structure

```
.
├── src/
│   └── index.ts           # Main plugin entry point
├── static/
│   └── figtree.css        # Custom font CSS configurations
├── dist/                  # Build output (generated)
├── biome.json             # Biome configuration
├── rslib.config.ts        # Rslib build configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Package metadata and scripts
```

## Development Workflow

### Setup

```bash
bun install
```

### Development

```bash
bun run dev          # Watch mode for development
```

### Build

```bash
bun run build        # Production build
```

### Linting

```bash
bun run lint         # Run Biome checks
```

## Key Implementation Details

### Plugin Architecture

The plugin (`src/index.ts`) exports a `pluginFontFigtree` function that returns an `RspressPlugin` object. It configures:

1. **Font Loading**: Loads the Figtree variable font from `@fontsource-variable/figtree`
2. **Custom CSS**: Applies custom styling from `static/figtree.css`
3. **Performance**: Preloads `.woff2` font files to prevent FOUT (Flash of Unstyled Text)

### Build Configuration

- Uses Rslib for bundling
- Outputs ESM modules to `dist/`
- Includes type definitions
- Bundles both `dist/` and `static/` directories in published package

## Common Tasks for AI Agents

### Adding Features

- Modify `src/index.ts` for plugin logic changes
- Update `static/figtree.css` for font styling adjustments
- Ensure TypeScript types are preserved

### Testing Changes

- Run `bun run build` to verify builds successfully
- Run `bun run lint` to ensure code quality
- Test in a sample Rspress project by installing locally

### Publishing

- This project uses Release Please (`.github/workflows/release-please.yml`)
- Version bumps are automated via conventional commits
- Manual version bumps: `bun run bump`

### Dependencies

- Keep `@fontsource-variable/figtree` updated for latest font versions
- Ensure `@rspress/shared` version compatibility with target Rspress versions
- All other dependencies are dev-only

## Coding Standards

- **Style**: Enforced by Biome (see `biome.json`)
- **TypeScript**: Strict mode enabled
- **Imports**: Use ESM syntax
- **Paths**: Use `node:` protocol for Node.js built-ins

## Testing Strategy

This plugin currently relies on:

- Build-time validation (TypeScript compilation)
- Runtime testing in actual Rspress projects
- No unit test framework is currently configured

## Gotchas

1. Font files are loaded from `node_modules/@fontsource-variable/figtree/`
2. Preloading configuration is crucial for preventing font flickering
3. The plugin must be compatible with Rspress's builder configuration API

## References

- [Rspress Plugin API](https://rspress.dev/plugin/system/plugin-api.html)
- [Fontsource Documentation](https://fontsource.org/)
- [Figtree Font Specimen](https://fonts.google.com/specimen/Figtree)
