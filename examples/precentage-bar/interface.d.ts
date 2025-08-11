interface ViewProps {

}

// global.d.ts
declare namespace React {
  interface IntrinsicElements {
    // 声明 "View" 为固有元素，可添加具体属性类型（这里用 `any` 简化）
    View: any;
  }
}

declare const $container: {
  width: number
  height: number
}