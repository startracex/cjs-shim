# cjs-shim

Shims for ESM to CJS transformation.

- Replaces `fileURLToPath(import.meta.url)` to `__filename`
- Replaces `import.meta.filename` to `__filename`
- Replaces `import.meta.dirname` to `__dirname`
- Replaces `import.meta.resolve` to `require.resolve`
- Replaces `import.meta.env` to `process.env`
- Replaces `import.meta.main` to `require.main === module`
- Replaces `typeof import.meta` to `"undefined"`
- Removes `require = createRequire(import.meta.url)`
- Removes `global = globalThis`
