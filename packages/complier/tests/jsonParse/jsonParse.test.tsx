import { expect, test } from 'vitest'
import testFile from './testFile?raw'
import { complieSourceFile, complieToJson, runningTarget } from '../../src'

test('Parse platform component type', async () => {
  const module = await complieSourceFile(testFile)
  const nodes = await runningTarget(
    module.default
  )
  
  await complieToJson(nodes, module)
})