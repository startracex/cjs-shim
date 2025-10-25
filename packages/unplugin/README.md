# unplugin-cjs-shim

- Replaces `fileURLToPath(import.meta.url)` to `__filename`
- Replaces `import.meta.filename` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
- Replaces `import.meta.resolve` to `require.resolve`
- Replaces `import.meta.env` to `process.env`
- Replaces `import.meta.main` to `require.main === module`
- Replaces `typeof import.meta` to `"undefined"`
- Removes `require = createRequire(import.meta.url)`
- Removes `global = globalThis`

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

<details>
<summary>Astro</summary>

```ts
import shim from "unplugin-cjs-shim/astro";

export default {
  integrations: [shim()],
};
```

</details>

<details>
<summary>esbuild</summary>

```ts
import { build } from "esbuild";
import shim from "unplugin-cjs-shim/esbuild";

build({
  plugins: [shim()],
});
```

</details>

<details>
<summary>Farm</summary>

```ts
import shim from "unplugin-cjs-shim/farm";

export default {
  plugins: [shim()],
};
```

</details>

<details>
<summary>Nuxt</summary>

```js
import shim from "unplugin-cjs-shim/nuxt";

export default {
  modules: [["unplugin-cjs-shim/nuxt", {}]],
};
```

</details>

<details>
<summary>Rolldown</summary>

```ts
import shim from "unplugin-cjs-shim/rolldown";

export default {
  plugins: [shim()],
};
```

</details>

<details>
<summary>Rollup</summary>

```ts
import shim from "unplugin-cjs-shim/rollup";

export default {
  plugins: [shim()],
};
```

</details>

<details>
<summary>Rspack</summary>

```ts
const shim = require("unplugin-cjs-shim/rspack");

module.exports = {
  plugins: [shim()],
};
```

</details>

<details>
<summary>Vite</summary>

```ts
import shim from "unplugin-cjs-shim/vite";

export default {
  plugins: [shim()],
};
```

</details>

<details>
<summary>Webpack</summary>

```ts
const shim = require("unplugin-cjs-shim/webpack");

module.exports = {
  plugins: [shim()],
};
```

</details>
