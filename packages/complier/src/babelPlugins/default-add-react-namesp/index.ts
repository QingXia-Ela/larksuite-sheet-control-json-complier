import { PluginObj, types as Types } from "@babel/core";

/**
 * 为默认函数尾部添加 React 命名空间
 */
export default function babelAddReactNamespaceForDefaultFn({ types: t }) {
  return {
    name: "babel-add-react-namespaces-for-default-fn",
    visitor: {
      // 添加 React namespace
      ExportDefaultDeclaration(path) {
        // console.log(path.node);
        
      },
    }
  } as PluginObj
}