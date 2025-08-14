import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: {
        bundle: true,
        abortOnError: false,
      },
      output: {
        externals: ['esbuild', /babel/]
      },
      bundle: true,
      source: {
        entry: {
          index: './src/index.tsx',
          node: './src/node.ts',
        },
      },
    },
    {
      format: 'esm',
      plugins: [
        pluginNodePolyfill(),
      ],
      output: {
        target: 'web',
      },
      dts: {
        bundle: true,
        abortOnError: false,
      },
      bundle: true,
      source: {
        entry: {
          browser: './src/browser.ts'
        }
      },
      tools: {
        rspack(_config, { addRules }) {
          addRules({
            test: /\.wasm$/,
            type: 'asset'
          })
        }
      },
    }
  ],
  output: {
    cleanDistPath: false,
  },
});
