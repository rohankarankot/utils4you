import React from "react";

export default function Adsense({
  slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT || "DATA-ADSENSE-SLOT",
  client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "DATA-ADSENSE-CLIENT",
  className = "",
}: {
  slot?: string;
  client?: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      data-adsense-client={client}
      data-adsense-slot={slot}
    >
      {/* Placeholder for AdSense unit */}
      <div className="w-full rounded-md border border-dashed border-slate-200 bg-slate-50 text-slate-700 p-4 text-center dark:bg-slate-800 dark:text-slate-200">
        Ad Placeholder
      </div>
    </div>
  );
}
