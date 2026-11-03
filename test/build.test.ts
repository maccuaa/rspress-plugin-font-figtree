import { beforeAll, describe, expect, it } from "bun:test";
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = path.join(root, "test/fixture");

const buildFixture = (config: string, outDir: string) => {
  const output = path.join(fixture, outDir);
  rmSync(output, { recursive: true, force: true });

  const build = spawnSync(
    path.join(root, "node_modules/.bin/rspress"),
    ["build", "--config", config],
    { cwd: fixture, encoding: "utf8" },
  );

  if (build.status !== 0) {
    throw new Error(
      `rspress build failed with ${build.status}\n${build.stdout}\n${build.stderr}`,
    );
  }

  const read = (...segments: string[]) =>
    readFileSync(path.join(output, ...segments), "utf8");
  const list = (...segments: string[]) =>
    readdirSync(path.join(output, ...segments));

  return {
    list,
    css: () =>
      list("static/css")
        .filter((file) => file.endsWith(".css"))
        .map((file) => read("static/css", file))
        .join("\n"),
    figtreePreloads: (page: string) =>
      (read(page).match(/<link[^>]*rel="preload"[^>]*>/g) ?? []).filter((tag) =>
        tag.includes("figtree-"),
      ),
  };
};

describe("rspress build with the plugin", () => {
  let site: ReturnType<typeof buildFixture>;

  beforeAll(() => {
    site = buildFixture("rspress.config.ts", "doc_build");
  }, 120_000);

  it("emits the upright and italic Figtree variable fonts", () => {
    const fonts = site.list("static/font");

    for (const face of [
      "latin-wght-normal",
      "latin-ext-wght-normal",
      "latin-wght-italic",
      "latin-ext-wght-italic",
    ]) {
      expect(
        fonts.some((font) =>
          new RegExp(`^figtree-${face}\\..+\\.woff2$`).test(font),
        ),
      ).toBe(true);
    }
  });

  it("preloads only the Latin upright font", () => {
    for (const page of ["index.html", "404.html"]) {
      const tags = site.figtreePreloads(page);

      expect(tags).toHaveLength(1);
      expect(tags[0]).toContain("figtree-latin-wght-normal.");
      expect(tags[0]).toContain('as="font"');
      expect(tags[0]).toContain("crossorigin");
    }
  });

  it("declares upright and italic @font-face rules for Figtree Variable", () => {
    const faces = (site.css().match(/@font-face\{[^}]*\}/g) ?? []).filter(
      (face) => face.includes("Figtree Variable"),
    );

    expect(
      faces.filter((face) => face.includes("font-style:normal")),
    ).toHaveLength(2);
    expect(
      faces.filter((face) => face.includes("font-style:italic")),
    ).toHaveLength(2);
  });

  it("makes Figtree the default Rspress font", () => {
    expect(site.css()).toMatch(
      /body\{[^}]*--rp-font-family-base:\s*["']?Figtree Variable/,
    );
  });
});

describe("preload override from the README", () => {
  it("lets a site preload the Latin Extended subset as well", () => {
    const site = buildFixture(
      "rspress.preload-latin-ext.config.ts",
      "doc_build_preload_ext",
    );
    const tags = site.figtreePreloads("index.html");

    expect(tags).toHaveLength(2);
    expect(tags.some((tag) => tag.includes("figtree-latin-wght-normal."))).toBe(
      true,
    );
    expect(
      tags.some((tag) => tag.includes("figtree-latin-ext-wght-normal.")),
    ).toBe(true);
  }, 120_000);
});
