import type { Plugin } from "esbuild";
import { createEsbuildPlugin } from "unplugin";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => Plugin = createEsbuildPlugin(unpluginFactory);
export default _default;
