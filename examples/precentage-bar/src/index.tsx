export * from './data'
export * from './colorTokens'

export default function main() {
  // 定义公共样式和计算表达式
  const baseWidthExpr = "{{$container.width*0.9";
  const totalExpr = "/(openCount+closedCount+doingCount+invalidCount)}}";
  const heightExpr = "{{$container.height*0.9}}";
  
  // 各部分配置
  const sections = [
    {
      color: "{{$colorTokens.highlightAbnormal}}",
      value: "openCount",
      borderRadius: { topLeft: 8, bottomLeft: 8 }
    },
    {
      color: "{{$colorTokens.highlightWarning}}",
      value: "doingCount"
    },
    {
      color: "{{$colorTokens.highlightNormal}}",
      value: "closedCount"
    },
    {
      color: "{{$colorTokens.highlightInvalid}}",
      value: "invalidCount",
      borderRadius: { topRight: 8, bottomRight: 8 }
    }
  ];

  return (
    <View style={{
      width: "{{$container.width}}",
      height: "{{$container.height}}",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {sections.map((section, index) => (
        <View 
          key={index}
          style={{
            backgroundColor: section.color,
            width: `${baseWidthExpr}*${section.value}${totalExpr}`,
            height: heightExpr,
            borderRadius: section.borderRadius
          }}
        />
      ))}
    </View>
  );
}