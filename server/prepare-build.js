import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const srcDir = './src';
const tempDir = './src-temp';

function copyAndTransformFiles(dir, baseDir = '') {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      copyAndTransformFiles(fullPath, join(baseDir, file));
    } else if (extname(file) === '.ts') {
      let content = readFileSync(fullPath, 'utf8');
      
      // Transform .ts imports to .js imports
      content = content
        .replace(/from\s+['"](\.\/[^'"]+)\.ts['"]/g, "from '$1.js'")
        .replace(/import\s+.*?\s+from\s+['"](\.\/[^'"]+)\.ts['"]/g, (match, path) => {
          return match.replace(`${path}.ts`, `${path}.js`);
        });
      
      const relativePath = join(baseDir, file);
      const outputPath = join(tempDir, relativePath);
      
      // Create directory if it doesn't exist
      const outputDir = join(tempDir, baseDir);
      require('fs').mkdirSync(outputDir, { recursive: true });
      
      writeFileSync(outputPath, content);
    }
  }
}

// Clean and recreate temp directory
require('rimraf').sync(tempDir);
require('fs').mkdirSync(tempDir, { recursive: true });

// Copy and transform files
copyAndTransformFiles(srcDir);

console.log('Files copied and transformed to temp directory');
