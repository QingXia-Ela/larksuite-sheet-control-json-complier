import babel from '@babel/core'
import transformPlatformElement from '../babelPlugins/component-transform'
// import babelAddReactNamespaceForDefaultFn from '../babelPlugins/default-add-react-namesp'

async function parseJSX(str: string) {
  const code = await babel.transformAsync(str, {
    presets: [
      // [
      //   '@babel/preset-env',

      // ],
      [
        '@babel/preset-react',
        {
          // pragma: 'test',
          // pragmaFrag: 'Frag',
          // runtime: 'automatic'
        }
      ]
    ],
  })

  return code
}

const createElementReg = /React\.createElement(\([^]+?\))/g

export default async function complieJSXFile(str: string) {
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