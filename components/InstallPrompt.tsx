"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsStandalone(true);
            return;
        }

        // iOS Detection
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        if (isIosDevice) {
            // Show prompt for iOS if not in standalone mode
            // Note: You might want to use cookies/localstorage to not annoy user every time
            const hasSeenPrompt = localStorage.getItem("installPromptSeen");
            if (!hasSeenPrompt) {
                setShowPrompt(true);
            }
        }

        // Android/Desktop PWA Prompt
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    const handleClose = () => {
        setShowPrompt(false);
        localStorage.setItem("installPromptSeen", "true");
    };

    if (!showPrompt || isStandalone) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
            <div className="max-w-md w-full pointer-events-auto shadow-2xl animate-in slide-in-from-bottom-5 duration-500">
                <Card className="bg-white dark:bg-slate-900 border-2 border-primary-500/50 p-4 relative overflow-hidden">
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl border border-[var(--surface-border)] shadow-lg overflow-hidden shrink-0 bg-white">
                            <img src="/logo.png" alt="Utils4You" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="font-bold text-lg">Install Utils4You</h3>
                                <p className="text-sm text-slate-500 leading-tight mt-1">
                                    {isIOS
                                        ? "Install this app on your iPhone for a better experience."
                                        : "Add to your home screen for offline access and faster loading."
                                    }
                                </p>
                            </div>

                            {isIOS ? (
                                <div className="text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg space-y-2">
                                    <p className="flex items-center gap-2">
                                        1. Tap the <Share size={16} /> Share button
                                    </p>
                                    <p className="flex items-center gap-2">
                                        2. Select <span className="font-semibold">Add to Home Screen</span>
                                    </p>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleInstallClick}
                                    className="w-full justify-center"
                                >
                                    Install App
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
