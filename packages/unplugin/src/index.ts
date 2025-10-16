import { createUnplugin, type UnpluginFactory, type UnpluginInstance } from "unplugin";
import { replacements as r } from "cjs-shim/replacements";
import { transform } from "cjs-shim";
import type { Options } from "./types.ts";

const _include = /.(ts|tsx|js|jsx|mjs|mts)$/;
const _exclude = /node_modules/;

export const unpluginFactory: UnpluginFactory<Options | undefined> = ({
  replacements = r,
  include = _include,
  exclude = _exclude,
} = {}) => {
  return {
    name: "unplugin-cjs-shim",
    transform: {
      filter: {
        id: { include, exclude },
      },
      handler(code, id) {
        return transform(replacements, code, id);
      },
    },
  };
};

export const unplugin: UnpluginInstance<Options, boolean> =
  /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
