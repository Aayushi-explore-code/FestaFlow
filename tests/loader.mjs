import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Custom ESM resolver to support:
 * 1. Directory imports (e.g. '../types' -> '../types/index.ts')
 * 2. Extensionless relative imports (e.g. './module' -> './module.ts')
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    const parentURL = context.parentURL;
    if (parentURL && parentURL.startsWith('file:')) {
      const parentPath = fileURLToPath(parentURL);
      const parentDir = path.dirname(parentPath);
      const targetPath = path.resolve(parentDir, specifier);

      if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
        const indexPath = path.join(targetPath, 'index.ts');
        if (fs.existsSync(indexPath)) {
          return nextResolve(pathToFileURL(indexPath).href, context);
        }
      }

      if (fs.existsSync(targetPath + '.ts')) {
        return nextResolve(pathToFileURL(targetPath + '.ts').href, context);
      }
    }
  }
  return nextResolve(specifier, context);
}

/**
 * Custom ESM loader to provide runtime placeholders for pure TypeScript type modules
 * (such as src/types/index.ts) that have no runtime exports when stripped.
 */
export async function load(url, context, nextLoad) {
  if (url.startsWith('file:') && (url.endsWith('/types/index.ts') || url.endsWith('\\types\\index.ts'))) {
    const filePath = fileURLToPath(url);
    const content = fs.readFileSync(filePath, 'utf-8');
    const exportMatches = [
      ...content.matchAll(/export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/g),
    ];
    const exportNames = exportMatches.map((m) => m[1]);
    const mockExports = exportNames
      .map((name) => `export const ${name} = {};`)
      .join('\n');
    return {
      format: 'module',
      shortCircuit: true,
      source: mockExports,
    };
  }
  return nextLoad(url, context);
}
