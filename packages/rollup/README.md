# rollup-plugin-cjs-shim

Rollup plugin to shim CJS modules.

- Replaces `fileURLToPath(import.meta.url)` to `__filename`
- Replaces `import.meta.filename` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
- Replaces `import.meta.resolve` to `require.resolve`
- Replaces `import.meta.env` to `process.env`
- Replaces `typeof import.meta` to `"undefined"`
- Removes `require = createRequire(import.meta.url)`
- Removes `global = globalThis`

## Usage

```js
import cjsShim from "rollup-plugin-cjs-shim";

export default {
  input: "index.js",
  output: {
    file: "index.cjs",
    format: "cjs",
  },
  plugins: [cjsShim()],
};
```

## Example

Input

```js
import { createRequire } from "module";
export const filename = import.meta.filename;
export const dirname = import.meta.dirname;

const require = createRequire(import.meta.url);
require("path");
```

Output

```js
"use strict";
require("module");

const filename = __filename;
const dirname = __dirname;

exports.dirname = dirname;
exports.filename = filename;

require("path");
```
