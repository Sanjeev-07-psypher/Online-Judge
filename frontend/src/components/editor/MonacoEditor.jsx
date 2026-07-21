import Editor from "@monaco-editor/react";

const MonacoEditor = ({
  language,
  code,
  setCode,
}) => {
  return (
    <Editor
      height="600px"
      theme="vs-dark"
      language={language}
      value={code}
      onChange={(value) =>
        setCode(value || "")
      }
      options={{
        fontSize: 14,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default MonacoEditor;