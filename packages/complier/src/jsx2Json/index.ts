export default async function jsx2Json(jsx: React.JSX.Element): Promise<any> {
  if (!jsx) return
  const type = jsx.type
  const children = jsx.props?.children
  const props = { ...jsx.props }

  if (type === 'Text') {
    // todo!: add error tips
    if (props.children && !props.content) {
      props.content = props.children
      delete props.children
    }

    return jsx
  }

  delete props.children

  const res: any = {
    type: jsx.type.toLowerCase(),
    props,
  }

  const parseChildren = Array.isArray(children) ? 
      await Promise.all(children.map(jsx2Json)) :
      [
        await jsx2Json(children)
      ]
  if (parseChildren[0]) {
    res.children = parseChildren
  }

  return res
}