import { describe, expect, it } from "bun:test";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const packageName = (specifier: string) =>
  specifier
    .split("/")
    .slice(0, specifier.startsWith("@") ? 2 : 1)
    .join("/");

describe("published types", () => {
  it("only import packages the plugin declares as dependencies or peers", () => {
    const declarations = readFileSync(
      path.join(root, "dist/index.d.ts"),
      "utf8",
    );
    const { dependencies, peerDependencies } = JSON.parse(
      readFileSync(path.join(root, "package.json"), "utf8"),
    );
    const declared = Object.keys({ ...dependencies, ...peerDependencies });
    const imported = [
      ...declarations.matchAll(/from\s+["']([^"'.][^"']*)["']/g),
    ]
      .map(([, specifier]) => specifier)
      .filter((specifier) => !specifier.startsWith("node:"))
      .map(packageName);

    for (const name of imported) {
      expect(declared).toContain(name);
    }
  });

  it("are accepted by Rspress's defineConfig", () => {
    const tsc = spawnSync(
      path.join(root, "node_modules/.bin/tsc"),
      ["--noEmit", "-p", path.join(root, "test/fixture/tsconfig.json")],
      { encoding: "utf8" },
    );

    if (tsc.status !== 0) {
      throw new Error(
        `tsc failed with ${tsc.status}\n${tsc.stdout}${tsc.stderr}`,
      );
    }
  });
});
