# babel-plugin-cjs-shim

- Replaces `fileURLToPath(import.meta.url)` to `__filename`
- Replaces `import.meta.filename` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
- Replaces `import.meta.resolve` to `require.resolve`
- Replaces `import.meta.env` to `process.env`
- Replaces `import.meta.main` to `require.main === module`
- Replaces `typeof import.meta` to `"undefined"`
- Removes `require = createRequire(import.meta.url)`
- Removes `global = globalThis`

## Example

### In

```js
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const global = globalThis,
  filename = import.meta.filename,
  dirname = import.meta.dirname;

filename === fileURLToPath(import.meta.url);
typeof import.meta === "undefined";
```

### Out

```js
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const filename = __filename,
  dirname = __dirname;
filename === __filename;
"undefined" === "undefined";
```

## Usage

```json
{
  "plugins": ["babel-plugin-cjs-shim"]
}
```
