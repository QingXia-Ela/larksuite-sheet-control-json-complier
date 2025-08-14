import * as monaco from 'monaco-editor'
import { RefObject, useEffect, useLayoutEffect, useState } from 'react';

self.MonacoEnvironment = {
	getWorker(workerId, label) {
    const newWorker = (url: URL) => new Worker(url)
    switch (label) {
      case 'typescript':
      case 'javascript':
        // return newWorker(new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url))
      case 'json':
        // return newWorker(new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url))
        // return newWorker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url))
      default:
        return newWorker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url))
    }
  },
};

function useMonacoEditor(
  container: RefObject<HTMLElement | null>,
  options?: monaco.editor.IStandaloneEditorConstructionOptions & {

  }
) {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>()
  
  useEffect(() => {
    if (!container?.current) return
    else {
      const meditor = monaco.editor.create(
        container.current,
        options
      )
      setEditor(meditor)
    }

    return () => {
      if (editor) editor.dispose()
    }
  }, [container])

  const dispose = () => editor?.dispose
  return {
    dispose,
    editor,
  };
}

export default useMonacoEditor;