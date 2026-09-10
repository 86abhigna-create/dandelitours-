import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

function flatRepoFallbackPlugin() {
  return {
    name: 'flat-repo-fallback',
    enforce: 'pre' as const,
    resolveId(source: string, importer?: string) {
      if (!importer || importer.includes('node_modules')) return null;

      // Automatically find ../types or ./types
      if (source.endsWith('/types') || source === '../types' || source === './types') {
        for (const candidate of [
          path.resolve(__dirname, 'types.ts'),
          path.resolve(__dirname, 'src/types.ts'),
        ]) {
          if (fs.existsSync(candidate)) return candidate;
        }
      }

      // Automatically find mockData in root or data folder
      if (source.includes('mockData')) {
        for (const candidate of [
          path.resolve(__dirname, 'mockData.ts'),
          path.resolve(__dirname, 'data/mockData.ts'),
          path.resolve(__dirname, 'src/data/mockData.ts'),
          path.resolve(__dirname, 'src/mockData.ts'),
        ]) {
          if (fs.existsSync(candidate)) return candidate;
        }
      }

      // Automatically find any component in root or components folder
      if (source.includes('components/')) {
        const componentName = source.split('components/').pop();
        if (componentName) {
          for (const ext of ['.tsx', '.ts', '']) {
            for (const candidate of [
              path.resolve(__dirname, componentName + ext),
              path.resolve(__dirname, 'components', componentName + ext),
              path.resolve(__dirname, 'src/components', componentName + ext),
            ]) {
              if (fs.existsSync(candidate)) return candidate;
            }
          }
        }
      }

      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [flatRepoFallbackPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
