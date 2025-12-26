"use client";

import React, { useState, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2, Wand2, Settings } from "lucide-react";
import Button from "./Button";
import Card from "./Card";

const LANGUAGES = [
  { id: "javascript", name: "JavaScript", version: "18.15.0", defaultCode: `console.log("Hello, World!");\n\nfunction sum(a, b) {\n  return a + b;\n}\n\nconsole.log("Sum: " + sum(5, 10));` },
  { id: "python", name: "Python", version: "3.10.0", defaultCode: `print("Hello, World!")\n\ndef sum(a, b):\n    return a + b\n\nprint(f"Sum: {sum(5, 10)}")` },
  { id: "java", name: "Java", version: "15.0.2", defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Sum: " + (5 + 10));\n    }\n}` },
  { id: "cpp", name: "C++", version: "10.2.0", defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    std::cout << "Sum: " << (5 + 10) << std::endl;\n    return 0;\n}` },
  { id: "typescript", name: "TypeScript", version: "5.0.3", defaultCode: `console.log("Hello, TypeScript!");\n\nconst sum = (a: number, b: number): number => a + b;\n\nconsole.log("Sum: " + sum(5, 10));` },
  { id: "go", name: "Go", version: "1.16.2", defaultCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    fmt.Println("Sum:", 5+10)\n}` },
  { id: "rust", name: "Rust", version: "1.68.2", defaultCode: `fn main() {\n    println!("Hello, World!");\n    println!("Sum: {}", 5 + 10);\n}` },
  { id: "php", name: "PHP", version: "8.2.3", defaultCode: `<?php\n\necho "Hello, World!\\n";\necho "Sum: " . (5 + 10);\n` },
];

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

export default function CodeEditor() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // Handle Language Change
  const handleLanguageChange = (langId: string) => {
    const selectedLang = LANGUAGES.find((l) => l.id === langId);
    if (selectedLang) {
      setLanguage(selectedLang);
      setCode(selectedLang.defaultCode);
      setOutput("");
    }
  };

  // Format Code
  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  // Run Code via Piston API
  const runCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language.id,
          version: language.version,
          files: [
            {
              content: code,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to execute code");
      }

      const { run } = data;
      setOutput(run.output || "No output returned.");
    } catch (error: any) {
      setOutput(`Error: ${error.message || "Something went wrong."}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Copy Code to Clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  // Toggle Full Screen
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`flex flex-col gap-6 w-full mx-auto transition-all duration-300 ${isFullScreen
      ? "fixed inset-0 z-50 h-[100dvh] w-[100dvw] bg-[#1e1e1e] p-4"
      : "max-w-6xl"
      }`}>
      <Card className={`p-0 overflow-hidden border-0 shadow-xl bg-[#1e1e1e] flex flex-col ${isFullScreen ? "h-full rounded-none" : ""
        }`}>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#2d2d2d] p-3 text-gray-300 gap-3 border-b border-[#3e3e3e] shrink-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select
              value={language.id}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-[#3e3e3e] border border-[#555] rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <div className="flex items-center gap-2 mr-2 border-r border-[#444] pr-2">
              <Settings size={16} className="text-gray-500" />
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-[#3e3e3e] border border-[#555] rounded-md px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                title="Font Size"
              >
                {FONT_SIZES.map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
            </div>

            <button
              onClick={formatCode}
              className="p-2 hover:bg-[#3e3e3e] rounded-md transition-colors text-blue-400 hover:text-blue-300"
              title="Prettify (Format Code)"
            >
              <Wand2 size={16} />
            </button>

            <button
              onClick={() => {
                setCode(language.defaultCode);
                setOutput("");
              }}
              className="p-2 hover:bg-[#3e3e3e] rounded-md transition-colors"
              title="Reset Code"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={copyCode}
              className="p-2 hover:bg-[#3e3e3e] rounded-md transition-colors"
              title="Copy Code"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
            <button
              onClick={toggleFullScreen}
              className="p-2 hover:bg-[#3e3e3e] rounded-md transition-colors"
              title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <Button
              onClick={runCode}
              disabled={isRunning}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${isRunning
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-900/50"
                }`}
            >
              {isRunning ? (
                <>Loading...</>
              ) : (
                <>
                  <Play size={16} fill="currentColor" /> Run
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className={`flex flex-col lg:flex-row ${isFullScreen ? "flex-1 h-full min-h-0" : "h-[600px] lg:h-[700px]"
          }`}>
          {/* Monaco Editor */}
          <div className="flex-1 h-1/2 lg:h-full relative min-h-0">
            <Editor
              height="100%"
              language={language.id}
              value={code}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                formatOnPaste: true,
                formatOnType: true,
                folding: true,
                foldingStrategy: "indentation",
                foldingHighlight: true,

                fontFamily: "'Fira Code', 'Consolas', monospace",
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="w-full lg:w-[40%] h-1/2 lg:h-full bg-[#1e1e1e] border-t lg:border-t-0 lg:border-l border-[#3e3e3e] flex flex-col min-h-0">
            <div className="bg-[#252526] px-4 py-2 border-b border-[#3e3e3e] text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
              Output
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-auto text-gray-300 whitespace-pre-wrap">
              {output ? (
                output
              ) : (
                <span className="text-gray-600 italic">
                  Click "Run" to see output...
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>


    </div>
  );
}
