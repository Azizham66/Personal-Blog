## 🚀 Available Scripts

### Development
- `npm run serve` - Development mode with nodemon (runs TypeScript directly)
- `npm run dev` - Development with esbuild watch and auto-restart

### Production
- `npm run build` - Production build (creates optimized bundle)
- `npm start` - Run the built production server
- `npm run clean` - Clean build artifacts

## 📁 Build Output

- `dist/server.bundle.js` - Production-ready bundled server (7.9kb)
- `dist/server.bundle.js.map` - Source maps for debugging

## 🔧 How It Works

### Development Mode
- Uses `ts-node` to run TypeScript files directly
- Imports use `.ts` extensions (allowed by tsconfig.json)
- Nodemon watches for changes and restarts automatically

### Production Mode
- `esbuild` transforms `.ts` imports to `.js` automatically
- Creates a single optimized bundle
- Handles all module resolution internally

## 🎯 Usage

**For development:**
```bash
npm run serve  # Simple TypeScript development
```

**For production:**
```bash
npm run build  # Create production bundle
npm start      # Run the optimized server
```

## ✅ Key Features

- **Zero-config development** - Just run `npm run serve`
- **Fast production builds** - 34ms build time with esbuild
- **Automatic import handling** - No manual extension management
- **Source maps** - Full debugging support in production
- **Optimized bundles** - Small, fast production builds

