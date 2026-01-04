"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "./Button";
import Card from "./Card";
import { Upload, Download, FileImage, Settings, RefreshCw, X, RotateCw, RotateCcw, Crop as CropIcon, Check, Undo } from "lucide-react";

export default function ImageCompressor() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [processedFile, setProcessedFile] = useState<File | null>(null); // The result of edits (crop/rotate)
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // This shows what is currently being worked on
    const [isCompressing, setIsCompressing] = useState(false);
    const [quality, setQuality] = useState(0.8);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Editor State
    const [editMode, setEditMode] = useState(false);
    const cropperRef = useRef<ReactCropperElement>(null);

    // cleanup preview url on unmount
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const compressImage = useCallback(async (file: File, q: number, w?: number, h?: number) => {
        setIsCompressing(true);
        try {
            const options: any = {
                maxSizeMB: 1,
                useWebWorker: true,
                initialQuality: q,
            };

            if (w && h) {
                options.maxWidthOrHeight = Math.max(w, h);
            }

            const compressed = await imageCompression(file, options);
            setCompressedFile(compressed);
        } catch (err) {
            console.error(err);
            setError("Failed to compress image.");
        } finally {
            setIsCompressing(false);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = useCallback((file: File) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            return;
        }

        // Validate file size (10MB max)
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_FILE_SIZE) {
            setError("File size must be less than 10MB. Please choose a smaller image.");
            return;
        }

        setError(null);
        setOriginalFile(file);
        setProcessedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Get initial dimensions
        if (typeof window !== 'undefined') {
            const img = new window.Image();
            img.onload = () => {
                setWidth(img.width);
                setHeight(img.height);
            };
            img.src = url;
        }

        setCompressedFile(null);
        // Auto compress
        compressImage(file, quality, undefined, undefined);
    }, [compressImage, quality]);

    const handleFileDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    }, [processFile]);

    // Debounced re-compression
    useEffect(() => {
        if (processedFile) {
            const timer = setTimeout(() => {
                compressImage(processedFile, quality, width, height);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [quality, processedFile, width, height, compressImage]);

    const handleApplyEdit = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    const newFile = new File([blob], originalFile?.name || "image.png", { type: originalFile?.type || "image/png" });
                    setProcessedFile(newFile);
                    setPreviewUrl(URL.createObjectURL(newFile));

                    // Update dims
                    if (typeof window !== 'undefined') {
                        const img = new window.Image();
                        img.onload = () => {
                            setWidth(img.width);
                            setHeight(img.height);
                        };
                        img.src = URL.createObjectURL(newFile);
                    }

                    setEditMode(false);
                    compressImage(newFile, quality, width, height);
                }
            });
        }
    };

    const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'w' | 'h') => {
        const val = parseInt(e.target.value) || 0;
        const MAX_DIM = 10000;

        // Validate bounds
        if (val < 0) {
            setError("Dimension cannot be negative.");
            return;
        }

        if (val > MAX_DIM) {
            setError(`Dimension must be ${MAX_DIM}px or less.`);
            return;
        }

        setError(null);

        if (type === 'w') {
            setWidth(val);
        } else {
            setHeight(val);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getSavings = () => {
        if (!originalFile || !compressedFile) return 0;
        const savings = ((originalFile.size - compressedFile.size) / originalFile.size) * 100;
        return Math.max(0, savings).toFixed(1);
    };

    const downloadImage = () => {
        if (!compressedFile) return;
        const url = URL.createObjectURL(compressedFile);
        const link = document.createElement("a");
        link.href = url;
        link.download = `compressed-${originalFile?.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">

            {/* Upload Area */}
            {!originalFile && (
                <div
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleFileSelect}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                        <div className="bg-primary-100 dark:bg-primary-900/20 p-4 rounded-full mb-4 text-primary-600 dark:text-primary-400">
                            <Upload size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Upload an Image</h3>
                        <p className="text-slate-500 mb-6">Drag and drop or click to browse</p>
                        <Button>Select Image</Button>
                    </label>
                </div>
            )}

            {/* Editor & Preview Area */}
            {originalFile && (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Settings & Status */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-6">
                            <div className="flex items-center justify-between border-b pb-4 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                                        <FileImage size={24} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-semibold truncate max-w-[200px]">{originalFile.name}</p>
                                        <p className="text-sm text-slate-500">{formatSize(originalFile.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setOriginalFile(null); setCompressedFile(null); setPreviewUrl(null); setProcessedFile(null); }}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Controls */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                                    <Settings size={18} /> Compression Settings
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Quality</span>
                                        <span className="font-mono">{Math.round(quality * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.05"
                                        value={quality}
                                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm block mb-1">Width (px)</label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => handleDimensionChange(e, 'w')}
                                            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm block mb-1">Height (px)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => handleDimensionChange(e, 'h')}
                                            disabled
                                            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm opacity-50 cursor-not-allowed"
                                            title="Height adjusts automatically to maintain aspect ratio (Coming Soon)"
                                        />
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full" onClick={() => setEditMode(true)}>
                                    <CropIcon size={16} className="mr-2" /> Crop & Rotate
                                </Button>

                            </div>

                            {/* Result Stats */}
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-500">Compressed Size</span>
                                    {isCompressing ? (
                                        <RefreshCw size={16} className="animate-spin text-primary-500" />
                                    ) : (
                                        <span className="font-bold text-green-600 dark:text-green-400">
                                            {compressedFile ? formatSize(compressedFile.size) : "..."}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Savings</span>
                                    <span className="font-medium">{getSavings()}%</span>
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                disabled={!compressedFile || isCompressing}
                                onClick={downloadImage}
                            >
                                <Download size={18} className="mr-2" /> Download Image
                            </Button>
                        </Card>
                    </div>

                    {/* Preview */}
                    <div className="bg-checkered rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[400px] bg-slate-100 dark:bg-slate-900/50">
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-full max-h-[500px] object-contain"
                                style={{ filter: isCompressing ? 'blur(2px)' : 'none', transition: 'filter 0.3s' }}
                                width={800}
                                height={500}
                                unoptimized
                            />
                        ) : (
                            <div className="text-slate-400">No image selected</div>
                        )}
                    </div>
                </div>
            )}

            {/* Full Screen Modal for Editor */}
            {editMode && previewUrl && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="p-4 border-b flex justify-between items-center bg-white dark:bg-slate-900">
                            <h2 className="font-bold text-lg px-2">Edit Image</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setEditMode(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><X size={24} /></button>
                            </div>
                        </div>

                        {/* Workspace */}
                        <div className="relative bg-slate-100 dark:bg-slate-950 p-4 h-[70vh] flex items-center justify-center">
                            <Cropper
                                src={previewUrl}
                                style={{ height: '100%', width: '100%', maxHeight: '70vh' }}
                                initialAspectRatio={0} // Free crop
                                guides={true}
                                ref={cropperRef}
                                viewMode={1}
                                background={false}
                                className="rounded-lg shadow-inner"
                            />
                        </div>

                        {/* Toolbar */}
                        <div className="p-4 border-t bg-white dark:bg-slate-900 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                <button
                                    onClick={() => cropperRef.current?.cropper.rotate(-90)}
                                    className="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors tooltip"
                                    title="Rotate Left"
                                >
                                    <RotateCcw size={20} />
                                </button>
                                <button
                                    onClick={() => cropperRef.current?.cropper.rotate(90)}
                                    className="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors tooltip"
                                    title="Rotate Right"
                                >
                                    <RotateCw size={20} />
                                </button>
                                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center"></div>
                                <button
                                    onClick={() => cropperRef.current?.cropper.reset()}
                                    className="p-3 hover:bg-white dark:hover:bg-slate-700 text-red-500 rounded-lg transition-colors tooltip"
                                    title="Reset Changes"
                                >
                                    <Undo size={20} />
                                </button>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="ghost" onClick={() => setEditMode(false)}>Cancel</Button>
                                <Button onClick={handleApplyEdit} className="px-8">
                                    <Check size={18} className="mr-2" /> Apply Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
