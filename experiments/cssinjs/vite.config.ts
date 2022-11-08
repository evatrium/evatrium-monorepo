//
/// <reference types="vitest" />
/// <reference types="vite/client" />
// @ts-ignore
// import viteSPA from '@evatrium/configs/vite/app/vite.boilerplateSPA.config.mjs';
//
// export default viteSPA({ spa: false });
// import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve as pathResolve } from 'node:path';
import { deepMerge, isObj } from '@evatrium/utils';
// import react from '@preact/preset-vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
// @ts-ignore
export default function viteBoilerplateSPA({ pwa } = {}) {
  const path = (pathname: string) => pathResolve(process.cwd(), pathname);
  const src = path('src');
  const publicDir = path('public');
  const outDir = path('dist');
  //@ts-ignore @TODO
  let pwaConfig = {
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    // switch to "true" to enable sw on development
    devOptions: {
      enabled: false
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}']
    }
  };
  if (isObj(pwa)) {
    //@ts-ignore @TODO
    pwaConfig = deepMerge(pwaConfig, pwa, { arrayMerge: 'concat' });
  }

  return defineConfig({
    plugins: [react(), pwa && VitePWA(pwaConfig)].filter(Boolean),
    resolve: {
      alias: {
        '~': src
      }
    }
  });
}
