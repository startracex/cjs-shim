import { createRollupPlugin } from "unplugin";
import type { Plugin } from "rollup";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => Plugin | Plugin[] = createRollupPlugin(unpluginFactory);
export default _default;
