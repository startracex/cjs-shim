import MagicString, { type SourceMap } from "magic-string";
import {
  createSourceFile,
  ScriptKind,
  ScriptTarget,
  visitEachChild,
  visitNode,
  type Visitor,
} from "typescript";
import type { Replacement } from "./replacements.ts";

export const createVisitor = (replacements: Replacement[], sm: MagicString): Visitor => {
  const visitor: Visitor = (node) => {
    for (const replacement of replacements) {
      replacement(node, sm);
    }
    return visitEachChild(node, visitor, undefined);
  };
  return visitor;
};

export const transform = (
  replacements: Replacement[],
  code: string,
  id: string,
): {
  code: string;
  map: SourceMap;
} => {
  const ms = new MagicString(code);
  const visitor = createVisitor(replacements, ms);
  const sourceFile = createSourceFile(id, code, ScriptTarget.Latest, true, ScriptKind.Deferred);
  visitNode(sourceFile, visitor);
  return {
    code: ms.toString(),
    map: ms.generateMap({ hires: true }),
  };
};
