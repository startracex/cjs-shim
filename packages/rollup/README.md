# rollup-plugin-cjs-shim

Rollup plugin to shim CJS modules.

- Replaces `import.meta.filename` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
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
