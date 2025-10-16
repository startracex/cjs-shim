import { createRolldownPlugin } from "unplugin";
import type { Plugin } from "rolldown";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => Plugin | Plugin[] = createRolldownPlugin(unpluginFactory);
export default _default;
