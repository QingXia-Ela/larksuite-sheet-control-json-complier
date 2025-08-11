import { expect, test } from 'vitest'
import testFile from './testFile?raw'
import { complieSourceFile, runningTarget } from '../../src'

test('Parse platform component type', async () => {
  const module = await complieSourceFile(testFile)
  await runningTarget(
    module.default
  )
  // console.log();
})