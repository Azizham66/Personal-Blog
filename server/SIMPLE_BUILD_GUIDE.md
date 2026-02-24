# Simple Industry-Standard Build System

This is the **standard approach** that real teams use for TypeScript Node.js projects.

## 🚀 Simple Commands

```bash
npm run dev    # Development with auto-reload
npm run build  # Build for production  
npm start      # Run production build
```

## 🏗️ How It Works

### Development (`npm run dev`)
- Uses `tsx watch` to run TypeScript directly
- **No extension issues** - uses `.js` imports (industry standard)
- Auto-reloads on file changes
- Fast and simple

### Production (`npm run build` + `npm start`)
- Standard `tsc` compilation to `dist/`
- Runs compiled JavaScript with `node`
- No complex bundling needed for Node.js

## 🎯 Why This is Better

1. **No extension gymnastics** - Use `.js` imports from day 1
2. **Standard tools** - `tsx` and `tsc` are industry standards
3. **Simple configuration** - One `tsconfig.json`
4. **No bundling complexity** - Node.js doesn't need it
5. **Easy deployment** - Standard `npm build && npm start`

## 📁 File Structure

```
src/
  server.ts          # TypeScript source
  routes/
    posts.js         # Imports use .js extensions
dist/
  server.js          # Compiled JavaScript
  routes/
    posts.js          # Compiled files
```

## 🔧 Key Settings

- **Imports**: Always use `.js` extensions (even in TypeScript)
- **tsx**: Faster than `ts-node`, simpler configuration
- **tsc**: Standard TypeScript compiler
- **No bundling**: Node.js handles modules natively

This is exactly what you'll see in production teams at companies like Vercel, Shopify, etc.
