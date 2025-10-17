import MagicString, { type SourceMap } from "magic-string";
import {
  createSourceFile,
  ScriptKind,
  ScriptTarget,
  visitEachChild,
  visitNode,
  type Visitor,
} from "typescript";
import { shim } from "./shim.ts";

export const createVisitor = (ms: MagicString): Visitor => {
  const visitor: Visitor = (node) => {
    shim(node, ms);
    return visitEachChild(node, visitor, undefined);
  };
  return visitor;
};

export const transform = (
  code: string,
  id: string,
): {
  code: string;
  map: SourceMap;
} => {
  const ms = new MagicString(code);
  const visitor = createVisitor(ms);
  const sourceFile = createSourceFile(id, code, ScriptTarget.Latest, true, ScriptKind.Deferred);
  visitNode(sourceFile, visitor);
  return {
    code: ms.toString(),
    map: ms.generateMap({ hires: true }),
  };
};
