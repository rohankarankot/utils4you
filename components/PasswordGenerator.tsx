"use client";

import React, { useState, useEffect, useCallback } from "react";
import { generatePassword, calculatePasswordStrength, PasswordOptions } from "../lib/tools/passwordGenerator";
import Button from "./Button";
import Card from "./Card";
import { Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck, ShieldOff } from "lucide-react";

export default function PasswordGenerator() {
    const [options, setOptions] = useState<PasswordOptions>({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        excludeSimilarCharacters: false,
    });

    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState<{ score: number; label: string }>({ score: 0, label: "Very Weak" });

    const handleGenerate = useCallback(() => {
        const newPassword = generatePassword(options);
        setPassword(newPassword);
        setStrength(calculatePasswordStrength(newPassword));
        setCopied(false);
    }, [options]);

    useEffect(() => {
        handleGenerate();
    }, [handleGenerate]);

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const strengthColor = () => {
        switch (strength.label) {
            case "Very Strong": return "text-emerald-500";
            case "Strong": return "text-green-500";
            case "Fair": return "text-yellow-500";
            case "Weak": return "text-orange-500";
            default: return "text-red-500";
        }
    };

    const strengthIcon = () => {
        switch (strength.label) {
            case "Very Strong": return <ShieldCheck className="text-emerald-500" size={20} />;
            case "Strong": return <ShieldCheck className="text-green-500" size={20} />;
            case "Fair": return <Shield className="text-yellow-500" size={20} />;
            case "Weak": return <ShieldAlert className="text-orange-500" size={20} />;
            default: return <ShieldOff className="text-red-500" size={20} />;
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <div className="space-y-8">
                {/* Output Section */}
                <div className="relative group">
                    <div className="flex items-center justify-between h-16 px-4 bg-[var(--bg)] border rounded-xl overflow-hidden font-mono text-xl sm:text-2xl tracking-wider shadow-inner group-hover:border-[var(--primary)] transition-all">
                        <span className="truncate pr-12">{password || "Configure options..."}</span>
                        <div className="absolute right-2 flex gap-1">
                            <button
                                onClick={handleGenerate}
                                className="p-2 hover:bg-[var(--surface-border)] rounded-lg transition-colors text-[var(--muted)] hover:text-[var(--primary)]"
                                title="Generate New"
                            >
                                <RefreshCw size={20} />
                            </button>
                            <button
                                onClick={handleCopy}
                                className={`p-2 rounded-lg transition-all ${copied ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'hover:bg-[var(--surface-border)] text-[var(--muted)] hover:text-[var(--primary)]'}`}
                                title="Copy Password"
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Strength Meter */}
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="flex items-center gap-2">
                                {strengthIcon()}
                                Security Strength: <span className={strengthColor()}>{strength.label}</span>
                            </span>
                            <span className="text-[var(--muted)]">{password.length} characters</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={`h-full flex-1 transition-all duration-500 ${i <= strength.score ? (
                                            strength.score >= 5 ? 'bg-emerald-500' :
                                                strength.score >= 4 ? 'bg-green-500' :
                                                    strength.score >= 3 ? 'bg-yellow-500' :
                                                        strength.score >= 2 ? 'bg-orange-500' : 'bg-red-500'
                                        ) : 'bg-[var(--surface-border)]'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Configuration Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="font-semibold text-sm uppercase tracking-wider text-[var(--muted)]">Password Length</label>
                                <span className="font-mono font-bold text-lg bg-[var(--primary)] text-white px-3 py-1 rounded-lg">{options.length}</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                value={options.length}
                                onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                                className="w-full h-2 bg-[var(--bg)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                            />
                            <div className="flex justify-between mt-2 text-xs text-[var(--muted)] font-mono">
                                <span>4</span>
                                <span>32</span>
                                <span>64</span>
                            </div>
                        </div>

                        <div className="p-4 bg-[var(--bg)] rounded-xl border border-[var(--surface-border)] space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Options</h4>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors">Exclude Similar Characters</span>
                                <input
                                    type="checkbox"
                                    checked={options.excludeSimilarCharacters}
                                    onChange={(e) => setOptions({ ...options, excludeSimilarCharacters: e.target.checked })}
                                    className="w-5 h-5 rounded border-[var(--surface-border)] text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                                />
                            </label>
                            <p className="text-[10px] text-[var(--muted)]">(e.g. i, l, 1, L, o, 0, O)</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Characters Included</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { key: 'includeUppercase', label: 'Uppercase (A-Z)', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
                                { key: 'includeLowercase', label: 'Lowercase (a-z)', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
                                { key: 'includeNumbers', label: 'Numbers (0-9)', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
                                { key: 'includeSymbols', label: 'Symbols (!@#$%^&*)', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' }
                            ].map((item) => (
                                <label
                                    key={item.key}
                                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${(options as any)[item.key]
                                            ? `border-[var(--primary)] bg-blue-50/50 dark:bg-blue-900/10`
                                            : 'border-[var(--surface-border)] hover:border-slate-300'
                                        }`}
                                >
                                    <span className="text-sm font-medium">{item.label}</span>
                                    <input
                                        type="checkbox"
                                        checked={(options as any)[item.key]}
                                        onChange={(e) => {
                                            const newOptions = { ...options, [item.key]: e.target.checked };
                                            // Ensure at least one is selected
                                            if (!newOptions.includeUppercase && !newOptions.includeLowercase && !newOptions.includeNumbers && !newOptions.includeSymbols) {
                                                return;
                                            }
                                            setOptions(newOptions);
                                        }}
                                        className="w-5 h-5 rounded border-[var(--surface-border)] text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleGenerate} size="lg" className="flex-1 justify-center shadow-lg hover:shadow-xl transition-shadow">
                        <RefreshCw size={18} className="mr-2" /> Generate New Password
                    </Button>
                    <Button onClick={handleCopy} variant="outline" size="lg" className="flex-1 justify-center">
                        {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
                        {copied ? "Copied to Clipboard!" : "Copy Password"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
