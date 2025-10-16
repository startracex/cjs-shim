# babel-plugin-cjs-shim

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
