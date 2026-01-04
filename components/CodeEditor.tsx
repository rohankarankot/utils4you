"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const editorRef = useRef<any>(null);

  // Detect system dark mode preference
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initially
    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

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

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `API error: ${response.status}`);
      }

      const data = await response.json();

      // Validate response structure
      if (!data.run) {
        throw new Error("Invalid API response structure");
      }

      const { run } = data;
      setOutput(run.output || "No output returned.");
    } catch (error: any) {
      clearTimeout(timeout);

      if (error.name === 'AbortError') {
        setOutput(`Error: Request timeout - the code execution took too long (>10s).\nPlease try again or simplify your code.`);
      } else if (error.message.includes('Failed to fetch')) {
        setOutput(`Error: Network error - please check your internet connection and try again.`);
      } else {
        setOutput(`Error: ${error.message || "Something went wrong while executing the code."}`);
      }
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
      ? `fixed inset-0 z-50 h-[100dvh] w-[100dvw] ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'} p-4`
      : "max-w-6xl"
      }`}>
      <Card className={`p-0 overflow-hidden border-0 shadow-xl ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'} flex flex-col ${isFullScreen ? "h-full rounded-none" : ""
        }`}>
        {/* Toolbar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between ${isDarkMode ? 'bg-[#2d2d2d] text-gray-300 border-[#3e3e3e]' : 'bg-gray-100 text-gray-700 border-gray-300'} p-3 gap-3 border-b shrink-0`}>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select
              value={language.id}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={`${isDarkMode ? 'bg-[#3e3e3e] border-[#555] text-gray-200' : 'bg-white border-gray-300 text-gray-900'} rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48`}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <div className={`flex items-center gap-2 mr-2 border-r ${isDarkMode ? 'border-[#444]' : 'border-gray-300'} pr-2`}>
              <Settings size={16} className="text-gray-500" />
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className={`${isDarkMode ? 'bg-[#3e3e3e] border-[#555] text-gray-200' : 'bg-white border-gray-300 text-gray-900'} rounded-md px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500`}
                title="Font Size"
              >
                {FONT_SIZES.map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
            </div>

            <button
              onClick={formatCode}
              className={`p-2 ${isDarkMode ? 'hover:bg-[#3e3e3e] text-blue-400 hover:text-blue-300' : 'hover:bg-gray-200 text-blue-600 hover:text-blue-700'} rounded-md transition-colors`}
              title="Prettify (Format Code)"
            >
              <Wand2 size={16} />
            </button>

            <button
              onClick={() => {
                setCode(language.defaultCode);
                setOutput("");
              }}
              className={`p-2 ${isDarkMode ? 'hover:bg-[#3e3e3e]' : 'hover:bg-gray-200'} rounded-md transition-colors`}
              title="Reset Code"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={copyCode}
              className={`p-2 ${isDarkMode ? 'hover:bg-[#3e3e3e]' : 'hover:bg-gray-200'} rounded-md transition-colors`}
              title="Copy Code"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
            <button
              onClick={toggleFullScreen}
              className={`p-2 ${isDarkMode ? 'hover:bg-[#3e3e3e]' : 'hover:bg-gray-200'} rounded-md transition-colors`}
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
              theme={isDarkMode ? "vs-dark" : "light"}
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
          <div className={`w-full lg:w-[40%] h-1/2 lg:h-full ${isDarkMode ? 'bg-[#1e1e1e] border-[#3e3e3e]' : 'bg-gray-50 border-gray-300'} border-t lg:border-t-0 lg:border-l flex flex-col min-h-0`}>
            <div className={`${isDarkMode ? 'bg-[#252526] text-gray-400 border-[#3e3e3e]' : 'bg-gray-200 text-gray-700 border-gray-300'} px-4 py-2 border-b text-xs font-bold uppercase tracking-wider shrink-0`}>
              Output
            </div>
            <div className={`flex-1 p-4 font-mono text-sm overflow-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} whitespace-pre-wrap`}>
              {output ? (
                output
              ) : (
                <span className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} italic`}>
                  Click &quot;Run&quot; to see output...
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>


    </div>
  );
}
