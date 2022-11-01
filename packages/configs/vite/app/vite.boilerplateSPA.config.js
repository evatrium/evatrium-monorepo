import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve as pathResolve } from 'node:path';
import { deepMerge, isObj } from '@evatrium/utils';

// https://vitejs.dev/config/
export default function viteBoilerplateSPA({ pwa } = {}) {
  const src = pathResolve(process.cwd(), 'src');
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
