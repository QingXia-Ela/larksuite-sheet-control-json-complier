import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { complieFile } from '../../dist/browser'
import testFile from './test-files/index?raw'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>Hello World</div>
  </StrictMode>,
)

await complieFile(testFile)
