import * as React from "react";

window.React = React
/**
 * 将字符串转换为File对象
 * @param {string} str - 要转换的字符串内容
 * @param {string} filename - 生成的文件名
 * @param {string} mimeType - 文件的MIME类型
 * @returns {File} 生成的File对象
 */
function stringToFile(str: string, filename: string, mimeType: string): File {
  // 创建Blob对象
  const blob = new Blob([str], { type: mimeType });
  // 从Blob创建File对象
  return new File([blob], filename, { type: mimeType });
}

export const stringToUrl = (str: string, filename  = 'dynamic-module.js', mimeType = 'text/javascript') => URL.createObjectURL(
  stringToFile(str, filename, mimeType)
)

/**
 * 将字符串转换为可通过import导入的模块
 * @param {string} str - 模块代码字符串
 * @param {string} [filename='dynamic-module.js'] - 模块文件名
 * @param {string} [mimeType='text/javascript'] - MIME类型
 * @returns {Promise<Object>} 导入的模块对象
 */
export async function importFromStringAtBrowser(str: string, filename?: string, mimeType?: string): Promise<any> {
  try {
    // 我顶死你我顶死你我顶死你
    str = str.replace("import React from \"react\";", "const module = {};") + "\nmodule.exports"
    const module = eval(str)
    return module;
  } catch (error) {
    console.error('导入模块时发生错误:', error);
    throw error;
  }
}
