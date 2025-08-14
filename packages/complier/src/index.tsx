import { JSX } from "react";
import jsx2Json from "./jsx2Json";

function pickSpeicalExport(source: any) {
  const { $i18n = {}, $colorTokens = {}, data = {} } = source
  return {
    $i18n,
    $colorTokens,
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
