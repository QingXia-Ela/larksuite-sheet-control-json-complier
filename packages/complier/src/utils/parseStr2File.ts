import path from 'path'
import fs from 'fs/promises'

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


/**
 * 将字符串内容写入临时文件
 * @param {string} content - 要写入的字符串内容
 * @param {string} filename - 临时文件名
 * @returns {Promise<string>} 临时文件的路径
 */
export async function stringToTempFile(content: string, filename: string = 'dynamic-module.js'): Promise<string> {
    // 创建临时文件路径
    const tempDir = './node_modules/.larksuite-complier';
    const filePath = path.join(tempDir, filename);
    
    // 确保临时目录存在
    await fs.mkdir(tempDir, { recursive: true });
    
    // 写入内容到临时文件
    await fs.writeFile(filePath, content, 'utf8');
    
    return filePath;
}

/**
 * 将字符串作为模块导入
 * @param {string} code - 模块代码字符串
 * @param {string} [filename='dynamic-module.js'] - 模块文件名
 * @returns {Promise<Object>} 导入的模块对象
 */
export async function importFromString(code: string, filename: string = 'dynamic-module.js'): Promise<any> {
    // 将字符串写入临时文件
    const filePath = await stringToTempFile(code, filename);
    
    try {
        // 导入模块
        const module = await import(
            path.resolve(`./${filePath}`)
        );
        return module;
    } finally {
        // 清理临时文件（可选，根据需求决定是否保留）
        try {
            // await fs.unlink(filePath);
        } catch (err) {
            // console.warn('清理临时文件失败:', err);
        }
    }
}
