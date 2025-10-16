import type { PluginObj, types as Types } from "@babel/core";

export default function ({ types: t }: { types: typeof Types }): PluginObj {
  return {
    name: "shim-cjs",
    visitor: {
      MemberExpression(path) {
        const isImportMeta =
          t.isMetaProperty(path.node.object) &&
          path.node.object.meta.name === "import" &&
          path.node.object.property.name === "meta";

        if (!isImportMeta) {
          return;
        }

        if (t.isIdentifier(path.node.property)) {
          const propName = path.node.property.name;
          switch (propName) {
            case "filename":
              path.replaceWith(t.identifier("__filename"));
              break;
            case "dirname":
              path.replaceWith(t.identifier("__dirname"));
              break;
            case "env":
              path.replaceWith(t.identifier("process.env"));
              break;
          }
        }
      },

      UnaryExpression(path) {
        if (path.node.operator !== "typeof") {
          return;
        }

        const isImportMeta =
          t.isMetaProperty(path.node.argument) &&
          path.node.argument.meta.name === "import" &&
          path.node.argument.property.name === "meta";

        if (isImportMeta) {
          path.replaceWith(t.stringLiteral("undefined"));
        }
      },

      VariableDeclaration(path) {
        if (!["var", "let", "const"].includes(path.node.kind)) {
          return;
        }

        const keepDeclarations = path.node.declarations.filter((decl) => {
          if (!t.isIdentifier(decl.id) || !decl.init) {
            return true;
          }

          const varName = decl.id.name;
          const { init } = decl;

          const isRequireDecl =
            varName === "require" &&
            t.isCallExpression(init) &&
            t.isIdentifier(init.callee, { name: "createRequire" }) &&
            init.arguments.length === 1 &&
            t.isMemberExpression(init.arguments[0]) &&
            t.isMetaProperty(init.arguments[0].object) &&
            init.arguments[0].object.meta.name === "import" &&
            init.arguments[0].object.property.name === "meta" &&
            t.isIdentifier(init.arguments[0].property, { name: "url" });

          const isGlobalDecl = varName === "global" && t.isIdentifier(init, { name: "globalThis" });

          return !isRequireDecl && !isGlobalDecl;
        });

        if (keepDeclarations.length === 0) {
          path.remove();
        } else if (keepDeclarations.length !== path.node.declarations.length) {
          path.node.declarations = keepDeclarations;
        }
      },
      CallExpression(path) {
        if (!t.isIdentifier(path.node.callee, { name: "fileURLToPath" })) {
          return;
        }

        if (path.node.arguments.length !== 1) {
          return;
        }

        const arg0 = path.node.arguments[0];
        const isImportMetaUrl =
          t.isMemberExpression(arg0) &&
          t.isMetaProperty(arg0.object) &&
          arg0.object.meta.name === "import" &&
          arg0.object.property.name === "meta" &&
          t.isIdentifier(arg0.property, { name: "url" });

        if (isImportMetaUrl) {
          path.replaceWith(t.identifier("__filename"));
        }
      },
    },
  };
}
