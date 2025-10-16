import unplugin from "./index.ts";
import type { Options } from "./types.ts";

export default (options: Options): any => ({
  name: "unplugin-cjs-shim",
  hooks: {
    "astro:config:setup": (astro: any) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(unplugin.vite(options));
    },
  },
});
