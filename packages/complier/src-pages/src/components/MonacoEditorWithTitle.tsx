import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import useMonacoEditor from '../hooks/useMonacoEditor';
import * as monaco from 'monaco-editor';

// monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
//   noSemanticValidation: true,
//   noSyntaxValidation: true, // This line disables errors in jsx tags like <div>, etc.
// });

// // I don't think the following makes any difference
// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//   // jsx: 'react',
//   jsx: monaco.languages.typescript.JsxEmit.React,
//   jsxFactory: 'React.createElement',
//   reactNamespace: 'React',
//   allowNonTsExtensions: true,
//   allowJs: true,
//   target: monaco.languages.typescript.ScriptTarget.Latest,
// });

interface MonacoEditorWithTitleProps {
  title: string;
  value: string;
  language: string;
  onChange?: (value: string) => void;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}

const MonacoEditorWithTitle: React.FC<MonacoEditorWithTitleProps> = ({
  title,
  value,
  language,
  onChange,
  options
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Monaco Editor
  const { dispose, editor } = useMonacoEditor(containerRef, {
    automaticLayout: true,
    theme: options?.theme || 'vs-dark',
    language: options?.language || language,
    ...options,
    value,
  });

  useEffect(() => {
    if (!editor) return
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      onChange?.(value)
    })
    // handleEditorDidMount(editor, monaco)
  }, [containerRef, editor])

  useEffect(() => {
    editor?.setValue(value)
  }, [value])

  return (
    <div className="monaco-editor-with-title flex flex-col h-full border rounded-md overflow-hidden shadow-sm">
      <div className="editor-header bg-gray-800 text-white px-4 py-2 flex items-center">
        <span>{title}</span>
      </div>
      <div className="editor-container flex-1" ref={containerRef} />
    </div>
  );
};

export default memo(MonacoEditorWithTitle);