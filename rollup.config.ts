import { globSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { RollupOptions } from "rollup";
import oxc from "rollup-plugin-oxc";

const outputs = [
  {
    format: "esm",
    entryFileNames: "[name].js",
    hoistTransitiveImports: false,
    sourcemap: true,
  },
  {
    format: "cjs",
    entryFileNames: "[name].cjs",
    hoistTransitiveImports: false,
    exports: "named",
    sourcemap: true,
  },
];

const plugins = [oxc({ minify: true })];

const makeOptions = (pkgPaths: string[]): RollupOptions[] => {
  // if the current working directory is a package, use it
  const targetPaths = pkgPaths.some(
    (pkgPath) => resolve(import.meta.dirname, pkgPath) === process.cwd(),
  )
    ? [process.cwd()]
    : pkgPaths;

  return targetPaths.map((pkgPath) => {
    const pkg = JSON.parse(readFileSync(join(pkgPath, "package.json")).toString());
    const input = globSync(join(pkgPath, "src/**/*.ts"));
    const external = Object.keys({
      ...pkg.dependencies,
      ...pkg.peerDependencies,
    }).map((name) => new RegExp(`^${name}($|\/.*$)`));
    return {
      input,
      external,
      output: outputs.map((out) => ({
        ...out,
        dir: join(pkgPath, "build"),
      })),
      plugins,
    } as RollupOptions;
  });
};

export default makeOptions([
  "packages/core",
  "packages/rollup",
  "packages/unplugin",
  "packages/babel",
]) as RollupOptions[];
