import { useEffect, useRef, useState } from "react";
import './App.css'
import MonacoEditorWithTitle from "./components/MonacoEditorWithTitle";
import testFile from './test-files/index?raw'
import templateFile from './test-files/template?raw'
import example2File from './test-files/example2?raw'
import example3File from './test-files/example3?raw'
import { complieFile } from '../../dist/browser'

function App() {
  const [tsxValue, setTsxValue] = useState('')
  const [cssValue, setCssValue] = useState('')
  const [jsonValue, setJsonValue] = useState('{}')

  const complie = (code: string) => {
    complieFile(
      code
    ).then((v) => {
      setJsonValue(v)
    })
  }

  const setV = (v: string) => {
    setTsxValue(v)
    complie(v)
  }

  const template = () => setV(templateFile)
  const example1 = () => setV(testFile)
  const example2 = () => setV(example2File)
  const example3 = () => setV(example3File)

  useEffect(template, [])

  return (
    <div className="wrapper flex flex-col">
      <div className="flex h-16 gap-4 items-center p-2">
        <button onClick={() => complie(tsxValue)}>编译</button>
        <button onClick={template}>模板</button>
        <button onClick={example1}>分布条</button>
        <button onClick={example2}>进度条</button>
        <button onClick={example3}>按钮组</button>
      </div>
      <div className="input-wrapper flex flex-1">
        <div className="editor-left flex flex-col">
          <MonacoEditorWithTitle title="index.jsx" value={tsxValue} onChange={setTsxValue} language="javascript" />
          {/* <MonacoEditorWithTitle title="index.css" value={cssValue} onChange={setCssValue} language="css" /> */}
        </div>
        <div className="editor-right">
          <MonacoEditorWithTitle title="output.json" value={jsonValue} onChange={setJsonValue} language="json" options={{
            // freeze code
            readOnly: true,
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;