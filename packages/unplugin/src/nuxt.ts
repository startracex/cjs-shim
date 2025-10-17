import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
import type { NuxtModule } from "@nuxt/schema";
import type { Options } from "./types.ts";
import vite from "./vite.ts";
import webpack from "./webpack.ts";

export interface ModuleOptions extends Options {}

const _default: NuxtModule<ModuleOptions, ModuleOptions, false> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-unplugin-cjs-shim",
    configKey: "unpluginCjsShim",
  },
  defaults: {},
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options));
    addWebpackPlugin(() => webpack(options));
  },
});
export default _default;
