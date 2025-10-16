import type MagicString from "magic-string";
import {
  isCallExpression,
  isIdentifier,
  isMetaProperty,
  isPropertyAccessExpression,
  isTypeOfExpression,
  isVariableStatement,
  type Node,
} from "typescript";

export type Replacement = (node: Node, sm: MagicString) => void;

export const replacements: Replacement[] = [
  // typeof import.meta
  (node, sm) => {
    if (isTypeOfExpression(node) && isMetaProperty(node.expression)) {
      sm.overwrite(node.getStart(), node.getEnd(), '"undefined"');
    }
  },

  (node, sm) => {
    // import.meta
    if (isPropertyAccessExpression(node) && isMetaProperty(node.expression)) {
      switch (node.name.getText()) {
        // import.meta.dirname -> __dirname
        case "dirname":
          sm.overwrite(node.getStart(), node.name.getEnd(), "__dirname");
          break;
        // import.meta.filename -> __filename
        case "filename":
          sm.overwrite(node.getStart(), node.getEnd(), "__filename");
          break;
      }
    }
  },

  // fileURLToPath(import.meta.url) -> __filename
  (node, sm) => {
    if (
      isCallExpression(node) &&
      isIdentifier(node.expression) &&
      node.expression.getText() === "fileURLToPath" &&
      node.arguments.length === 1 &&
      node.arguments[0].getText() === "import.meta.url"
    ) {
      sm.overwrite(node.getStart(), node.getEnd(), "__filename");
    }
  },

  // global = globalThis
  // require = createRequire(import.meta.url)
  (node, sm) => {
    if (isVariableStatement(node)) {
      const { declarations } = node.declarationList;
      let len = declarations.length;
      for (let i = 0; i < declarations.length; i++) {
        const decl = declarations[i];
        if (
          isIdentifier(decl.name) &&
          decl.initializer &&
          ((isIdentifier(decl.initializer) &&
            decl.name.getText() === "global" &&
            decl.initializer.getText() === "globalThis") ||
            (isCallExpression(decl.initializer) &&
              isIdentifier(decl.initializer.expression) &&
              decl.name.getText() === "require" &&
              decl.initializer.arguments.length === 1 &&
              decl.initializer.arguments[0].getText() === "import.meta.url" &&
              decl.initializer.expression.getText() === "createRequire"))
        ) {
          len--;
          if (len === 0) {
            sm.remove(node.getStart(), node.getEnd());
            break;
          }
          if (i === 0) {
            sm.remove(decl.getStart(), declarations[i + 1].getStart());
          } else {
            sm.remove(declarations[i - 1].getEnd(), decl.getEnd());
          }
        }
      }
    }
  },
];
