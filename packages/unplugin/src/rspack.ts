import { createRspackPlugin, type RspackPluginInstance } from "unplugin";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => RspackPluginInstance = createRspackPlugin(unpluginFactory);
export default _default;
