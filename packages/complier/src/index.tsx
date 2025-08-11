import { JSX } from "react";
import complieJSXFile from "./sourceComplier";
import { importFromString } from "./utils/parseStr2File";
import jsx2Json from "./jsx2Json";

export async function complieSourceFile(str: string) {
  const res = complieJSXFile(str)
  return await importFromString(res, `user-source.js`)
}

function pickSpeicalExport(source: any) {
  const { i18n = {}, colorTokens = {}, data = {} } = source
  return {
    $i18n: i18n,
    $colorTokens: colorTokens,
    data,
  }
}

export async function runningTarget(fn: (...args: unknown[]) => Promise<JSX.Element>) {
  return await fn()
}

export async function complieToJson(node: JSX.Element, options: any) {
  return JSON.stringify({
    definitions: pickSpeicalExport(options),
    template: await jsx2Json(node)
  }, null, 2)
}

export async function complie(str: string) {
  const module = await complieSourceFile(str)
  const nodes = await runningTarget(module.default)
  const json = await complieToJson(nodes, module)
  return json
}