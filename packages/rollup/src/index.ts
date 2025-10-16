import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import type { Plugin } from "rollup";
import { replacements as r, type Replacement } from "cjs-shim/replacements";
import { transform } from "cjs-shim";

const _include = /.(ts|tsx|js|jsx|mjs|mts)$/;
const _exclude = /node_modules/;

function cjsShim({
  replacements = r,
  include = _include,
  exclude = _exclude,
}: {
  replacements?: Replacement[];
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
      return transform(replacements, code, id);
    },
  };
}

export { cjsShim, cjsShim as default };
