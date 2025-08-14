export const $i18n = {
  foo: {
    zh_CN: "bar",
    en_US: "bar",
    ja_JP: "bar"
  }
}
export const $colorTokens = {
  foo: {
    light_mode: "bar"
  }
}
export const data = {
  foo: {
    type: 'string',
    name: "bar",
    mock_value: "bar"
  }
}

export default function myFormRenderer() {
  const innerExpression = `colorTokens.foo`
  const testExpression = `expression2 ${innerExpression}`
  return <View style={{
    width: innerExpression,
    height: testExpression
  }}></View>
}