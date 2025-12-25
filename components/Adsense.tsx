"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function Adsense({
  slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT|| "8795533518",
  className = "",
  style = { display: "block" },
  format = "auto",
  responsive = "true",
}: {
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: string;
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense push error:", err);
    }
  }, []);

 
  if (!slot ) {
    return (
      <div className={`${className} my-4`}>
        <div className="w-full rounded-md border border-dashed border-slate-200 bg-slate-50 text-slate-700 p-8 text-center dark:bg-slate-800 dark:text-slate-200">
          <p className="text-sm font-medium">AdSense Placeholder</p>
          <p className="text-xs text-slate-500 mt-1">Configure slot and client IDs to see real ads</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} my-4 overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
