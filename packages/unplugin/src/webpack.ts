import { createWebpackPlugin, type WebpackPluginInstance } from "unplugin";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => WebpackPluginInstance = createWebpackPlugin(unpluginFactory);
export default _default;
