import type { JsPlugin } from "@farmfe/core";
import { createFarmPlugin } from "unplugin";
import { unpluginFactory } from "./index.ts";
import type { Options } from "./types.ts";

const _default: (options?: Options) => JsPlugin = createFarmPlugin(unpluginFactory);
export default _default;
