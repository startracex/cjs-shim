# cjs-shim

- Replaces `import.meta.filename` to `__filename`
- Replaces `fileURLToPath(import.meta.url)` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
- Replaces `import.meta.env` to `process.env`
- Replaces `typeof import.meta` to `undefined`
- Removes `require = createRequire(import.meta.url)`
- Removes `global = globalThis`

## Usage

```js
import { transform } from "cjs-shim";
import { replacements } from "cjs-shim/replacements";

transform(replacements, "input code", "file name");
```

## Example

Input

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

Output

```js
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const filename = __filename,
  dirname = __filename;

filename === __filename;
"undefined" === "undefined";
```
