import path from 'path'
import fs from 'fs/promises'
import { complieToJson, runningTarget } from '.'
import esbuild from 'esbuild'
import complieJSXFile from './sourceComplier'
import { importFromString } from './utils/parseStr2File'

interface IComplieOptions {

}


export async function complieSourceFile(str: string) {
  const res = await complieJSXFile(str)
  
  const module =  await importFromString(res, `user-source.mjs`)
  
  return module
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


export async function complieFile(path: string, options: IComplieOptions) {
  await esbuild.build({
    entryPoints: [path],
    bundle: true,
    format: 'esm',
    outfile: './node_modules/.larksuite-complier/user-bundle.js',
    external: ['react'],
    // 保持 jsx 状态，转译留给 babel
    jsx: "preserve"
  })
  // console.log(111, outputFiles);
  
  const content = await fs.readFile('./node_modules/.larksuite-complier/user-bundle.js', 'utf-8')
  const res = await complie(content)
  try {
    await fs.mkdir('./dist')
  } catch {
    
  }
  
  await fs.writeFile('./dist/res.json', res)
}