"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Tesseract from "tesseract.js";
import Button from "./Button";
import Card from "./Card";
import { Upload, FileText, Image as ImageIcon, Copy, Download, RefreshCw, X, Loader2 } from "lucide-react";

export default function ImageToText() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");

    // Cleanup
    useEffect(() => {
        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, [imageUrl]);

    const handleFileDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setText("");
        setProgress(0);
        setStatus("Ready to scan");
    };

    const runOCR = async () => {
        if (!imageFile) return;

        setIsProcessing(true);
        setText("");
        setStatus("Initializing Tesseract...");

        try {
            const result = await Tesseract.recognize(
                imageFile,
                'eng',
                {
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                            setStatus(`Scanning... ${Math.round(m.progress * 100)}%`);
                        } else {
                            setStatus(m.status);
                        }
                    }
                }
            );
            setText(result.data.text);
            setStatus("Completed");
        } catch (err) {
            console.error(err);
            setStatus("Error occurred during scanning.");
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    const downloadText = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "extracted_text.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <FileText className="text-primary-600" size={32} />
                    Image to Text Converter
                </h1>
                <p className="text-slate-500">Extract text from images automatically using OCR technology.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Upload & Preview Side */}
                <div className="space-y-6">
                    {!imageFile ? (
                        <div
                            onDrop={handleFileDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer h-full flex flex-col items-center justify-center min-h-[300px]"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="image-upload"
                                onChange={handleFileSelect}
                            />
                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                                <div className="bg-primary-100 dark:bg-primary-900/20 p-4 rounded-full mb-4 text-primary-600 dark:text-primary-400">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Upload Image</h3>
                                <p className="text-slate-500 mb-6">Drag & drop or click to browse</p>
                                <Button>Select File</Button>
                            </label>
                        </div>
                    ) : (
                        <Card className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                            <div className="flex justify-between items-center border-b pb-4 dark:border-slate-800">
                                <span className="font-medium flex items-center gap-2">
                                    <ImageIcon size={18} className="text-slate-500" />
                                    Preview
                                </span>
                                <button onClick={() => { setImageFile(null); setImageUrl(null); setText(""); }} className="text-slate-400 hover:text-red-500">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 min-h-[300px] flex items-center justify-center">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt="Preview"
                                        className="max-w-full max-h-[400px] object-contain"
                                        width={600}
                                        height={400}
                                        unoptimized
                                    />
                                )}
                            </div>

                            <Button
                                onClick={runOCR}
                                disabled={isProcessing}
                                className="w-full"
                                size="lg"
                            >
                                {isProcessing ? (
                                    <> <Loader2 size={18} className="animate-spin mr-2" /> Processing... </>
                                ) : (
                                    <> <FileText size={18} className="mr-2" /> Extract Text </>
                                )}
                            </Button>
                        </Card>
                    )}
                </div>

                {/* Result Side */}
                <div className="space-y-4 flex flex-col h-full">
                    <Card className="flex-1 p-0 overflow-hidden flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="p-4 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Extracted Text</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!text}
                                    className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors disabled:opacity-50"
                                    title="Copy to Clipboard"
                                >
                                    <Copy size={18} />
                                </button>
                                <button
                                    onClick={downloadText}
                                    disabled={!text}
                                    className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors disabled:opacity-50"
                                    title="Download .txt"
                                >
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="relative flex-1 min-h-[400px]">
                            {isProcessing && (
                                <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 z-10 flex flex-col items-center justify-center">
                                    <div className="w-64 space-y-2">
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                            <span>{status}</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <textarea
                                className="w-full h-full p-4 bg-transparent outline-none resize-none font-mono text-sm leading-relaxed"
                                placeholder={!isProcessing ? "Text will appear here..." : ""}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
