export const $colorTokens = {
  "highlightAbnormal": {
    "light": "#F67E7A",
    "dark": "#F67E7A"
  },
  "highlightWarning": {
    "light": "#FFA338",
    "dark": "#FFA338"
  },
  "highlightNormal": {
    "light": "#45D036",
    "dark": "#45D036"
  },
  "background": {
    "light": "#f2f4f1",
    "dark": "#f2f4f1"
  },
  "fontColor": {
    "light": "#1F2329",
    "dark": "#FFFFFF"
  }
}

export const data = {
  progress: {
    "type": "number",
    "name": "进度",
    "mockValue": 0.7
  }
}

// 导出公共表达式和变量
const COMMON_EXPRESSIONS = {
  containerWidth: "{{$container.width}}",
  containerHeight: "{{$container.height}}",
  containerWidth90: "{{$container.width * 0.9}}",
  progressColor: "{{progress > 0.3 ? (progress > 0.6 ? $colorTokens.highlightNormal : $colorTokens.highlightWarning) : $colorTokens.highlightAbnormal}}",
  progressText: "{{progress * 100}}%",
  fontColor: "{{$colorTokens.fontColor}}",
  backgroundColor: "{{$colorTokens.background}}"
};

const COMMON_STYLES = {
  fullRadius: {
    topLeft: 8,
    topRight: 8,
    bottomLeft: 8,
    bottomRight: 8
  },
  pillRadius: {
    topLeft: 14,
    topRight: 14,
    bottomLeft: 14,
    bottomRight: 14
  }
};

export default function ProgressComponent() {
  const {
    containerWidth,
    containerHeight,
    containerWidth90,
    progressColor,
    progressText,
    fontColor,
    backgroundColor
  } = COMMON_EXPRESSIONS;

  const { fullRadius, pillRadius } = COMMON_STYLES;

  return (
    <View
      style={{
        width: containerWidth,
        height: containerHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: progressColor,
          width: 40,
          height: 20,
          borderRadius: fullRadius
        }}
      >
        <Text
          style={{
            color: fontColor,
            fontSize: 12
          }}
        >
          {progressText}
        </Text>
      </View>
      <View
        style={{
          width: containerWidth90,
          height: 10,
          marginTop: 10,
          backgroundColor: backgroundColor,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: pillRadius
        }}
      >
        <View
          style={{
            width: `{{${containerWidth90.replace('{{', '').replace('}}', '')} * progress}}`,
            height: 10,
            backgroundColor: progressColor,
            borderRadius: pillRadius
          }}
        />
      </View>
    </View>
  );
}
