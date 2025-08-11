import babel from '@babel/core'
import transformPlatformElement from '../babelPlugins/component-transform'
import babelAddReactNamespaceForDefaultFn from '../babelPlugins/default-add-react-namesp'

function addReactNamespaceForDefaultFn(str: string) {
  return babel.transformSync(str, {
    plugins: [
      babelAddReactNamespaceForDefaultFn
    ]
  })
}

function parseJSX(str: string) {
  const code = babel.transformSync(str, {
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
    plugins: [
      babelAddReactNamespaceForDefaultFn
    ]
  })

  return code
}

const createElementReg = /React\.createElement(\([^]+?\))/g

export default function complieJSXFile(str: string) {
  const code = parseJSX(str)?.code!

  return babel.transformSync(
    // code.replace(`"use strict";`, `"use strict";\nimport React from 'react'`),
    code,
    {
    plugins: [
        transformPlatformElement
      ],
    }
  )?.code!
}