import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: "2024-01-01",
});

const homepageData = {
    _type: "homepage",
    _id: "homepage-singleton",
    hero: {
        title: "Free Online Tools for",
        highlightedText: "Modern Productivity",
        subtitle: "Fast, secure, and focused on Indian users. Tools for text processing and financial calculations at your fingertips.",
    },
    benefits: {
        heading: "Why Professionals Choose Utils4You",
        description: "Utils4You is designed for those who value speed and privacy. Our platform provides a curated collection of essential utilities that run entirely in your browser. This means your data never touches our servers, giving you 100% security for your financial and text-based tasks. Whether you are calculating complex loan EMIs or optimizing text for SEO, Utils4You is your reliable daily partner.",
    },
    features: [
        {
            title: "Text Processing",
            description: "Everything you need for text: Word counter, slug generator, case converters, and character manipulation.",
            icon: "text",
            link: "/tools#text-tools",
            colorScheme: "indigo",
        },
        {
            title: "Financial Calculators for India",
            description: "Smart financial tools: EMI, SIP, and GST calculators specifically tuned for the Indian economy.",
            icon: "calculator",
            link: "/tools#financial-calculators",
            colorScheme: "cyan",
        },
        {
            title: "Developer Tools",
            description: "Code editor, JSON formatter, HTML minifier, and more tools built for developers.",
            icon: "code",
            link: "/tools#developer-tools",
            colorScheme: "purple",
        },
        {
            title: "Image & Media Tools",
            description: "Compress images, generate QR codes, and extract text from images with ease.",
            icon: "image",
            link: "/tools#image-tools",
            colorScheme: "green",
        },
    ],
    stats: [
        {
            number: "50+",
            label: "Free Tools",
            icon: "Wrench",
        },
        {
            number: "100%",
            label: "Privacy Focused",
            icon: "Shield",
        },
        {
            number: "0₹",
            label: "Always Free",
            icon: "Heart",
        },
        {
            number: "24/7",
            label: "Available",
            icon: "Clock",
        },
    ],
    cta: {
        heading: "Ready to boost your productivity?",
        description: "Join thousands of users who trust Utils4You for their daily tasks. All tools are free, fast, and privacy-focused.",
        buttonText: "Browse All Tools",
        buttonLink: "/tools",
    },
};

async function seedHomepage() {
    try {
        console.log("🌱 Seeding homepage data...");

        // Create or replace the homepage document
        const result = await client.createOrReplace(homepageData);

        console.log("✅ Homepage data seeded successfully!");
        console.log("📄 Document ID:", result._id);
    } catch (error) {
        console.error("❌ Error seeding homepage:", error);
        process.exit(1);
    }
}

seedHomepage();
