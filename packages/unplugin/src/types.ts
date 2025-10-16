import type { Replacement } from "cjs-shim/replacements";
import type { FilterPattern } from "unplugin";

export interface Options {
  replacements?: Replacement[];
  include?: FilterPattern;
  exclude?: FilterPattern;
}
