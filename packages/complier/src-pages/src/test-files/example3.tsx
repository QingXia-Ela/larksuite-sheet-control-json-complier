export const $colorTokens = {
  "border": {
    "dark": "#dee0e3",
    "light": "#dee0e3"
  },
  "textColor": {
    "light": "#4c88ff",
    "dark": "#99bbff"
  }
}

export const data = {
  "link": {
    "name": "打开的目标网页",
    "type": "string",
    "mockValue": "https://example.com"
  },
  "content": {
    "name": "写入剪贴板的内容",
    "type": "string",
    "mockValue": "Hello World"
  }
}

export const $i18n = {
  "button3": {
    "zh_CN": "📋 剪贴板",
    "en_US": "📋 Clipboard",
    "ja_JP": "📋 クリップボード"
  },
  "button2": {
    "zh_CN": "🛜 网络请求",
    "en_US": "🛜 HTTP Request",
    "ja_JP": "🛜 ネットワーク要求"
  },
  "button1": {
    "en_US": "🔗  Open Website",
    "ja_JP": "🔗  Webリンクを開く",
    "zh_CN": "🔗 打开网页链接"
  }
}


export default function ProgressComponent() {
  return (
    <View
      // allow class & style merge
      class="top-wrapper"
      style={{
        "width": "{{$container.width}}",
        "height": "{{$container.height}}",
      }}
    >
      <View
        class={'heightLimiter'} // allow module css
      >
        <View
          class='button-left button-base' // multi class
          onClick={{
            "action": "openLink",
            "params": {
              "url": "{{link}}"
            }
          }}
        >
          <Text
            class="text"
          >
            {"{{$i18n.button1}}"} {/* allow Text in children */}
          </Text>
        </View>
        <View
          class='button-base' // multi class
          onClick={{
            "action": "httpRequest",
            "params": {
              "method": "POST",
              "url": "https://example.com",
              "headers": {
                "x-custom-header": "x-custom-header"
              },
              "params": {
                "k": "v"
              },
              "body": {
                "a": 1,
                "b": 2
              }
            }
          }}
        >
          <Text
            class="text"
            content={"{{$i18n.button2}}"}
          ></Text>
        </View>
        <View
          class='button-base button-right'
          onClick={{
            "action": "writeTextToClipboard",
            "params": {
              "content": "{{content}}"
            }
          }}
        >
          <Text
            class="text"
            content="{{$i18n.button3}}"
          ></Text>
        </View>
      </View>
    </View>
  )
}
