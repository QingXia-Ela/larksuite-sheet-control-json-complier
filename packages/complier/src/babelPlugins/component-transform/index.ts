import { PluginObj, types as Types } from "@babel/core";

const targetTags = ['View', 'Text', 'Image']

/**
 * 转换 jsx 文件，并将平台指定元素类型转为字符串而不是函数组件
 */
export default function transformPlatformElement({ types: t }: {
  types: any
}) {
  return {
    name: "larksuite-sheet-control-tag-transformer",
    visitor: {
      Program(path) {
        // add React import on top
        path.node.body.unshift(
          t.importDeclaration(
            [
              t.importDefaultSpecifier(
                t.identifier('React')
              )
            ],
            t.stringLiteral('react')
          )
        )
      },
      CallExpression(path, state: any) {
        const tagsToConvert = state.opts.tags || targetTags;
        const callee = path.node.callee as Types.V8IntrinsicIdentifier & Record<string, any>;

        if (
          // without custom import source
          (t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object) && callee.object.name === 'React',
          t.isIdentifier(callee.property) && callee.property.name === 'createElement') ||
          // runtime automatic import
          (t.isIdentifier(callee) && (callee.name === '_jsx' || callee.name === '_jsxs' ) &&
          path.node.leadingComments?.[0]?.value === '#__PURE__')
        ) {
          const createTarget = path.node.arguments[0] as Types.Identifier
          if (t.isIdentifier(createTarget) && tagsToConvert.includes(createTarget.name)) {
            path.node.arguments[0] = t.stringLiteral(createTarget.name)
          }
        }
      }
    }
  } as PluginObj
}