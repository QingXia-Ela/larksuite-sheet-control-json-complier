import { PluginObj, types as Types } from "@babel/core";

const targetTags = ['View', 'Text', 'Image']

/**
 * 转换 jsx 文件，并将平台指定元素类型转为字符串而不是函数组件
 */
export default function transformPlatformElement({ types: t }) {
  return {
    name: "larksuite-sheet-control-tag-transformer",
    visitor: {
      Program(path) {
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
        // console.log(t.import.toString());
        // console.log(t.importDeclaration.toString());
      },
      CallExpression(path, state) {
        const tagsToConvert = state.opts.tags || targetTags;
        const callee = path.node.callee;
        
        if (
          (t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object) && callee.object.name === 'React',
          t.isIdentifier(callee.property) && callee.property.name === 'createElement') ||
          (t.isIdentifier(callee) && (callee.name === '_jsx' || callee.name === '_jsxs' ) &&
          path.node.leadingComments?.[0]?.value === '#__PURE__')
        ) {
          const createTarget = path.node.arguments[0]
          if (t.isIdentifier(createTarget) && tagsToConvert.includes(createTarget.name)) {
            path.node.arguments[0] = t.stringLiteral(createTarget.name)
          }
        }
      }
    }
  } as PluginObj
}