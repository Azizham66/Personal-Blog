import { build } from 'esbuild';
import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// Transform .ts imports to .js for production build
const transformImports = (content) => {
  return content
    .replace(/from\s+['"](\.\/[^'"]+)\.ts['"]/g, "from '$1.js'")
    .replace(/import\s+.*?\s+from\s+['"](\.\/[^'"]+)\.ts['"]/g, (match, path) => {
      return match.replace(`${path}.ts`, `${path}.js`);
    });
};

// Build with esbuild
build({
  entryPoints: [resolve('src/server.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/server.bundle.js',
  sourcemap: !isProduction,
  minify: isProduction,
  external: [
    'bcrypt',
    'body-parser',
    'cors',
    'dotenv',
    'express',
    'jsonwebtoken',
    'mongoose',
    'multer',
    '@types/*'
  ],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`
  },
  plugins: [
    {
      name: 'transform-imports',
      setup(build) {
        build.onLoad({ filter: /\.ts$/ }, async (args) => {
          const fs = await import('fs');
          const content = await fs.promises.readFile(args.path, 'utf8');
          return {
            contents: transformImports(content),
            loader: 'ts'
          };
        });
      }
    }
  ],
  logLevel: 'info'
}).catch(() => process.exit(1));
