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

export type Shim = (node: Node, sm: MagicString) => void;

export const shim: Shim =
  // typeof import.meta
  (node, sm) => {
    if (isTypeOfExpression(node) && isMetaProperty(node.expression)) {
      sm.overwrite(node.getStart(), node.getEnd(), '"undefined"');
      return;
    }

    // import.meta
    if (isPropertyAccessExpression(node) && isMetaProperty(node.expression)) {
      switch (node.name.getText()) {
        // import.meta.dirname -> __dirname
        case "dirname":
          sm.overwrite(node.getStart(), node.name.getEnd(), "__dirname");
          return;
        // import.meta.filename -> __filename
        case "filename":
          sm.overwrite(node.getStart(), node.getEnd(), "__filename");
          return;
        // import.meta.env -> process.env
        case "env":
          sm.overwrite(node.getStart(), node.getEnd(), "process.env");
          return;
        // import.meta.resolve -> require.resolve
        case "resolve":
          sm.overwrite(node.getStart(), node.getEnd(), "require.resolve");
          return;
      }
      return;
    }

    // fileURLToPath(import.meta.url) -> __filename
    if (
      isCallExpression(node) &&
      isIdentifier(node.expression) &&
      node.expression.getText() === "fileURLToPath" &&
      node.arguments.length === 1 &&
      node.arguments[0].getText() === "import.meta.url"
    ) {
      sm.overwrite(node.getStart(), node.getEnd(), "__filename");
      return;
    }

    // global = globalThis
    // require = createRequire(import.meta.url)
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
            return;
          }
          if (i === 0) {
            sm.remove(decl.getStart(), declarations[i + 1].getStart());
          } else {
            sm.remove(declarations[i - 1].getEnd(), decl.getEnd());
          }
        }
      }
      return;
    }
  };
