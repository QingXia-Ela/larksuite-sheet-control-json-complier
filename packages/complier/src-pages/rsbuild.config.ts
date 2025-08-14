import { defineConfig } from "@rsbuild/core";
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx'
    }
  },
  html: {
    template: './public/index.html'
  },
  plugins: [pluginNodePolyfill(), pluginReact()],
})