// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { resolve as pathResolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default function vitestit(override) {
  const src = pathResolve(process.cwd(), 'src');
  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '~': src
      }
    },
    test: {
      globals: true,
      watch: false,
      environment: 'jsdom',
      setupFiles: '@evatrium/configs/vite/vitest-setup.ts',
      resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx']
    }
  };
  return defineConfig(() => (typeof override === 'function' ? override(config) : config));
}
