import { importFromStringAtBrowser, stringToUrl } from './utils/parseStr2FileAtBrowser'
import { complieToJson, runningTarget } from '.'
import complieJSXFile from './sourceComplier'
import * as esbuild from 'esbuild-wasm'
import customResolver from './utils/browserCustomResolver';

const wasmURL = new URL('esbuild-wasm/esbuild.wasm', import.meta.url);

interface IComplieOptions {

}

async function initESbuild() {
  await esbuild.initialize({
    wasmURL: wasmURL.pathname,
  })
}

export async function complieSourceFile(str: string) {
  const res = await complieJSXFile(str)
  
  return await importFromStringAtBrowser(res, `user-source.mjs`)
}

export async function complie(str: string, options: IComplieOptions = {}) {
  // babel 转译
  const module = await complieSourceFile(str)
  // 执行目标用户函数
  const nodes = await runningTarget(module.default)
  // 提取 json
  const json = await complieToJson(nodes, module)
  return json
}

export async function complieFile(code: string) {
  await initESbuild()
  const files = {
    '/user-scripts.jsx': code
  }
  
  const res = await esbuild.build({
    entryPoints: [
      'user-scripts.jsx'
    ],
    bundle: true,
    format: 'cjs',
    write: false,
    external: ['react'],
    // 保持 jsx 状态，转译留给 babel
    jsx: "preserve",
    plugins:[
      customResolver(files)
    ]
  })
  const decoder = new TextDecoder()
  const output = decoder.decode(res.outputFiles[0].contents)
  
  console.log(
    await complie(output)
  );
}