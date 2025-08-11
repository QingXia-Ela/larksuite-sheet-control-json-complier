import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: {
        bundle: true,
        abortOnError: false,
      },
      bundle: true
    },
  ],
  source: {
    entry: {
      index: './src/index.tsx',
      node: './src/node.ts'
    }
  },
  output: {
    target: 'node',
    externals: [/@babel/, 'esbuild']
  },
});
