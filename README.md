# larksuite-sheet-control-json-toolkit

飞书项目 - 表单页控件 jsx 编译器

https://project.feishu.cn/b/helpcenter/1p8d7djs/kui20z6a#459e2395

## 执行原理

用户编写 jsx 文件，并根据规范导出所需变量与函数，编译器会针对用户文件打包并转译处理，随后执行用户导出的函数，并根据 jsx 节点生成 json

## 未来 todo

- [ ] 支持 css 文件引入
- [ ] 表达式错误检查支持
  - [ ] 表达式语法高亮
  - [ ] 智能提示支持
- [ ] 表达式短路求值
- [ ] 集成到官方脚手架
- [ ] 制作 ts 插件实现静态分析，而非编译后分析

## Examples

`examples` 目录下为针对插件后台的例子实现的 jsx 版本，后续也会持续更新

## 开始开发

node version: `v18.20.5`

使用 `pnpm` 作为唯一包管理器，**不准用其他的管理器喵**

根目录下执行：

```bash
pnpm i
pnpm build
```