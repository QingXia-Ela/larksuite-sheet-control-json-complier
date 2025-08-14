import * as babel from '@babel/core'
import transformPlatformElement from '../babelPlugins/component-transform'
// @ts-expect-error: type lost
import presetReact from '@babel/preset-react'

async function parseJSX(str: string) {
  
  const code = await babel.transformAsync(str, {
    presets: [
      // [
      //   '@babel/preset-env',

      // ],
      presetReact,
      // [
      //   '@babel/preset-react',
      //   {
      //     // pragma: 'test',
      //     // pragmaFrag: 'Frag',
      //     // runtime: 'automatic'
      //   }
      // ]
    ],
  })

  return code
}

const createElementReg = /React\.createElement(\([^]+?\))/g

export default async function complieJSXFile(str: string, options?: {
  cjsReactImport?: boolean
}) {
  const code = (await parseJSX(str))?.code!

  return (await babel.transformAsync(
    // code.replace(`"use strict";`, `"use strict";\nimport React from 'react'`),
    code,
    {
    plugins: [
        transformPlatformElement
      ],
    }
  ))?.code!
}