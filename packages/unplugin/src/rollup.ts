import { createRollupPlugin } from "unplugin";
import type { Plugin } from "rollup";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => Plugin<any> | Plugin<any>[] = createRollupPlugin<Options>(
  unpluginFactory,
) as any;
export default _default;
