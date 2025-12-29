import React from "react";

export default function GlobalSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.utils4you.in/#organization",
                "name": "Utils4You",
                "url": "https://www.utils4you.in/",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.utils4you.in/logo.png",
                    "width": 512,
                    "height": 512
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://www.utils4you.in/#website",
                "url": "https://www.utils4you.in/",
                "name": "Utils4You",
                "description": "Fast, secure, and private online tools for modern productivity. EMI, GST, SIP calculators, and text processing tools.",
                "publisher": {
                    "@id": "https://www.utils4you.in/#organization"
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
