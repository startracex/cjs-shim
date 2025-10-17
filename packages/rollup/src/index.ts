import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import type { Plugin } from "rollup";
import { transform } from "cjs-shim";

const _include = /.(ts|tsx|js|jsx|mjs|mts)$/;
const _exclude = /node_modules/;

function cjsShim({
  include = _include,
  exclude = _exclude,
}: {
  include?: FilterPattern;
  exclude?: FilterPattern;
} = {}): Plugin {
  const filter = createFilter(include, exclude);
  return {
    name: "cjs-shim",
    transform(code, id) {
      if (!filter(id)) {
        return;
      }
      return transform(code, id);
    },
  };
}

export { cjsShim, cjsShim as default };
