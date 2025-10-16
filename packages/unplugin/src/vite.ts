import { createVitePlugin } from "unplugin";
import type { Plugin } from "vite";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => Plugin | Plugin[] = createVitePlugin(unpluginFactory);
export default _default;
