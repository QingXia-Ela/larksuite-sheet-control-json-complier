import path from 'path'
import fs from 'fs/promises'
import { complie } from '.'
import esbuild from 'esbuild'


interface IComplieOptions {

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