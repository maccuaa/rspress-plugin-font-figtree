import { beforeAll, describe, expect, it } from "bun:test";
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = path.join(root, "test/fixture");
const output = path.join(fixture, "doc_build");

const read = (...segments: string[]) =>
  readFileSync(path.join(output, ...segments), "utf8");
const list = (...segments: string[]) =>
  readdirSync(path.join(output, ...segments));

const css = () =>
  list("static/css")
    .filter((file) => file.endsWith(".css"))
    .map((file) => read("static/css", file))
    .join("\n");

const figtreePreloads = (page: string) =>
  (read(page).match(/<link[^>]*rel="preload"[^>]*>/g) ?? []).filter((tag) =>
    tag.includes("figtree-"),
  );

beforeAll(() => {
  rmSync(output, { recursive: true, force: true });

  const build = spawnSync(
    path.join(root, "node_modules/.bin/rspress"),
    ["build"],
    { cwd: fixture, encoding: "utf8" },
  );

  if (build.status !== 0) {
    throw new Error(
      `rspress build failed with ${build.status}\n${build.stdout}\n${build.stderr}`,
    );
  }
}, 120_000);

describe("rspress build with the plugin", () => {
  it("emits the upright Figtree variable fonts", () => {
    const fonts = list("static/font");

    expect(
      fonts.some((f) => /^figtree-latin-wght-normal\..+\.woff2$/.test(f)),
    ).toBe(true);
    expect(
      fonts.some((f) => /^figtree-latin-ext-wght-normal\..+\.woff2$/.test(f)),
    ).toBe(true);
  });

  it("preloads the fonts as crossorigin font resources", () => {
    const tags = figtreePreloads("index.html");

    expect(tags).toHaveLength(2);
    for (const tag of tags) {
      expect(tag).toContain('as="font"');
      expect(tag).toContain("crossorigin");
    }
  });

  it("declares @font-face rules for Figtree Variable", () => {
    const faces = css().match(
      /@font-face\{[^}]*font-family:["']?Figtree Variable/g,
    );

    expect(faces?.length).toBeGreaterThanOrEqual(2);
  });

  it("makes Figtree the default Rspress font", () => {
    expect(css()).toMatch(
      /body\{[^}]*--rp-font-family-base:\s*["']?Figtree Variable/,
    );
  });
});
