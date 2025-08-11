export default async function jsx2Json(jsx: React.JSX.Element): Promise<any> {
  if (!jsx) return
  const children = jsx.props?.children
  const props = Object.create(jsx.props)
  delete props.children
  return {
    type: jsx.type.toLowerCase(),
    props,
    children: Array.isArray(children) ? 
      await Promise.all(children.map(jsx2Json)) :
      await jsx2Json(children),
  }
}