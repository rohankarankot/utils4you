"use client";

import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Button from "./Button";
import Card from "./Card";
import { Download, Link, Type, Mail, Phone, QrCode, Image as ImageIcon, Trash2, Palette } from "lucide-react";

type QRType = "url" | "text" | "email" | "phone";

export default function QRCodeGenerator() {
    const [type, setType] = useState<QRType>("url");

    // Specific fields for better UX
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Customization State
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const qrRef = useRef<HTMLDivElement>(null);

    const handleTypeChange = (newType: QRType) => {
        setType(newType);
    };

    const getQRValue = () => {
        switch (type) {
            case "url": return url;
            case "text": return text;
            case "email": return email ? `mailto:${email}` : "";
            case "phone": return phone ? `tel:${phone}` : "";
            default: return "";
        }
    };

    const currentQRValue = getQRValue();

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
    };

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector("canvas");
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <QrCode className="text-primary-600" size={32} />
                        QR Code Generator
                    </h1>

                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <TypeButton
                            active={type === "url"}
                            icon={<Link size={18} />}
                            label="URL"
                            onClick={() => handleTypeChange("url")}
                        />
                        <TypeButton
                            active={type === "text"}
                            icon={<Type size={18} />}
                            label="Text"
                            onClick={() => handleTypeChange("text")}
                        />
                        <TypeButton
                            active={type === "email"}
                            icon={<Mail size={18} />}
                            label="Email"
                            onClick={() => handleTypeChange("email")}
                        />
                        <TypeButton
                            active={type === "phone"}
                            icon={<Phone size={18} />}
                            label="Phone"
                            onClick={() => handleTypeChange("phone")}
                        />
                    </div>

                    <Card className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                        {type === "url" && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Website URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        )}
                        {type === "text" && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Plain Text</label>
                                <textarea
                                    placeholder="Enter your text here..."
                                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent min-h-[100px]"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                        )}
                        {type === "email" && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="user@example.com"
                                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        )}
                        {type === "phone" && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+1 234 567 8900"
                                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        )}
                    </Card>

                    {/* Customization */}
                    <Card className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <Palette size={20} /> Customize Appearance
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Foreground Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="h-10 w-16 p-1 rounded cursor-pointer"
                                    />
                                    <span className="text-sm font-mono text-slate-500">{fgColor}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Background Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="h-10 w-16 p-1 rounded cursor-pointer"
                                    />
                                    <span className="text-sm font-mono text-slate-500">{bgColor}</span>
                                </div>
                            </div>
                        </div>


                    </Card>
                </div>

                {/* Preview Section */}
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800" ref={qrRef}>
                        <QRCodeCanvas
                            value={currentQRValue || "https://example.com"}
                            size={256}
                            level="H"
                            includeMargin={true}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            imageSettings={logoFile ? {
                                src: URL.createObjectURL(logoFile),
                                height: 48,
                                width: 48,
                                excavate: true,
                            } : undefined}
                        />
                    </div>

                    <div className="text-center space-y-2">
                        {!currentQRValue && <p className="text-sm text-slate-500">Enter content to update the QR code</p>}

                        <Button
                            size="lg"
                            onClick={downloadQR}
                            disabled={!currentQRValue}
                            className="min-w-[200px]"
                        >
                            <Download size={18} className="mr-2" /> Download PNG
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypeButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${active
                ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}
