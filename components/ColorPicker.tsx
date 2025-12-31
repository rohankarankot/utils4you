"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Pipette } from "lucide-react";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "../lib/tools/colorPicker";

const ColorPicker: React.FC = () => {
    const [hex, setHex] = useState("#3B82F6");
    const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
    const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        const res = hexToRgb(hex);
        if (res) {
            setRgb(res);
            setHsl(rgbToHsl(res.r, res.g, res.b));
        }
    }, [hex]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setHex(val);
    };

    const handleRgbChange = (channel: "r" | "g" | "b", val: number) => {
        const newRgb = { ...rgb, [channel]: val };
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    };

    const handleHslChange = (channel: "h" | "s" | "l", val: number) => {
        const newHsl = { ...hsl, [channel]: val };
        setHsl(newHsl);
        const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--surface-border)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Visual Picker and Preview */}
                <div className="space-y-6">
                    <div
                        className="h-48 w-full rounded-2xl shadow-inner border border-[var(--surface-border)] transition-colors duration-200 flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: hex }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        <span className="text-white font-mono text-2xl font-bold drop-shadow-md z-10 uppercase">
                            {hex}
                        </span>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-[var(--muted)]">Select Color</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={hex}
                                onChange={handleHexChange}
                                className="w-16 h-16 rounded-xl cursor-pointer border-none bg-transparent"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={hex}
                                    onChange={handleHexChange}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--surface-border)] font-mono uppercase focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Formats and Sliders */}
                <div className="space-y-6">
                    {/* HEX Input */}
                    <div className="group">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-[var(--muted)]">HEX</label>
                            <button
                                onClick={() => copyToClipboard(hex.toUpperCase(), 'hex')}
                                className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--muted)] transition-colors"
                                title="Copy HEX"
                            >
                                {copied === 'hex' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>
                        <div className="font-mono text-lg p-3 bg-[var(--bg)] rounded-xl border border-[var(--surface-border)] uppercase">
                            {hex}
                        </div>
                    </div>

                    {/* RGB Sliders */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[var(--bg)] p-3 rounded-xl border border-[var(--surface-border)]">
                            <span className="text-sm font-semibold text-[var(--muted)]">RGB: {rgbString}</span>
                            <button
                                onClick={() => copyToClipboard(rgbString, 'rgb')}
                                className="p-2 rounded-lg hover:bg-[var(--surface)] text-[var(--muted)] transition-colors"
                            >
                                {copied === 'rgb' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="space-y-3">
                            {['r', 'g', 'b'].map((channel) => (
                                <div key={channel} className="flex items-center gap-4">
                                    <span className="w-4 font-mono text-xs uppercase text-[var(--muted)]">{channel}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgb[channel as keyof typeof rgb]}
                                        onChange={(e) => handleRgbChange(channel as any, parseInt(e.target.value))}
                                        className="flex-1 accent-[var(--primary)] h-1.5 bg-[var(--bg)] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="w-8 font-mono text-xs text-right">{rgb[channel as keyof typeof rgb]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HSL Sliders */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[var(--bg)] p-3 rounded-xl border border-[var(--surface-border)]">
                            <span className="text-sm font-semibold text-[var(--muted)]">HSL: {hslString}</span>
                            <button
                                onClick={() => copyToClipboard(hslString, 'hsl')}
                                className="p-2 rounded-lg hover:bg-[var(--surface)] text-[var(--muted)] transition-colors"
                            >
                                {copied === 'hsl' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="space-y-3">
                            {[
                                { key: 'h', max: 360, label: 'H' },
                                { key: 's', max: 100, label: 'S' },
                                { key: 'l', max: 100, label: 'L' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center gap-4">
                                    <span className="w-4 font-mono text-xs uppercase text-[var(--muted)]">{item.label}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max={item.max}
                                        value={hsl[item.key as keyof typeof hsl]}
                                        onChange={(e) => handleHslChange(item.key as any, parseInt(e.target.value))}
                                        className="flex-1 accent-[var(--primary)] h-1.5 bg-[var(--bg)] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="w-8 font-mono text-xs text-right">
                                        {hsl[item.key as keyof typeof hsl]}{item.key !== 'h' ? '%' : '°'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                <h3 className="text-lg font-bold mb-3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                    <Pipette size={20} />
                    How to Use
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                    Use the visual color picker or the input field to choose a color. All values will update automatically in real-time. You can manually adjust the RGB and HSL sliders to fine-tune your selection. Click the copy icon next to any format to copy it to your clipboard for use in your CSS or design software.
                </p>
            </div>
        </div>
    );
};

export default ColorPicker;
