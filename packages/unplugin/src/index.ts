import { createUnplugin, type UnpluginFactory, type UnpluginInstance } from "unplugin";
import { transform } from "cjs-shim";
import type { Options } from "./types.ts";

const _include = /.(ts|tsx|js|jsx|mjs|mts)$/;
const _exclude = /node_modules/;

export const unpluginFactory: UnpluginFactory<Options | undefined> = ({
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
        return transform(code, id);
      },
    },
  };
};

export const unplugin: UnpluginInstance<Options, boolean> =
  /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
