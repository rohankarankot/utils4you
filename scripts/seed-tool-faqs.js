const { createClient } = require('@sanity/client');

const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN || 'skyRJ66yoehknsn1y0m2YUR2pWM0P2FBhOWNd91CLPC025C2kRe796dOK4dC3EQx3ygFk3zghvOe5jmWHHzI5Xd01uxrVXC9hxg369OW4zfOpcsNFbBJ4iHQ0ufcatzPTENPQxJAWzR9CD3ofGudBLPp7BRWhP7UOWQnOHHRLdUiamFqzGhR';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rzrp85q6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-10-10',
    token: SANITY_WRITE_TOKEN,
    useCdn: false,
});

const blockify = (text) => [{
    _type: 'block',
    children: [{ _type: 'span', text }]
}];

const toolFaqs = {
    "emi-calculator": [
        { question: "How accurate is this EMI calculator?", answer: blockify("Our EMI calculator uses standard banking formulas to provide highly accurate estimates. However, the final figures from your bank may vary slightly due to processing fees, taxes, or specific compounding methods.") },
        { question: "Can I use this for home, car, and personal loans?", answer: blockify("Yes, this tool is versatile and can be used to calculate EMIs for Home Loans, Car Loans, Personal Loans, and any other reducing-balance interest loans in India.") },
        { question: "Does my financial data get saved on your servers?", answer: blockify("No. Your privacy is our priority. All loan details and interest rate inputs are processed locally in your browser and are never sent to our servers.") },
        { question: "What is the formula used for EMI calculation?", answer: blockify("We use the standard formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months.") },
        { question: "Can I use this tool offline?", answer: blockify("Yes! Since Utils4You is a Progressive Web App (PWA), you can install it on your device and access the EMI calculator even without an internet connection.") }
    ],
    "gst-calculator": [
        { question: "Does this GST calculator support all Indian tax slabs?", answer: blockify("Yes, it supports all current Indian GST slabs including 5%, 12%, 18%, and 28%. You can also input custom percentages.") },
        { question: "Can I calculate both GST Inclusive and Exclusive prices?", answer: blockify("Absolutely. Our tool allows you to add GST to a base price or calculate the original price from a GST-inclusive total.") },
        { question: "Is this tool updated with the latest GST rules?", answer: blockify("We regularly update our tools to reflect the latest Indian taxation guidelines, ensuring you always get compliant results.") },
        { question: "Is the calculation data private?", answer: blockify("Yes, 100%. Like all Utils4You tools, GST calculations happen entirely within your browser for complete data security.") },
        { question: "Can I export the GST breakdown?", answer: blockify("The current version displays a clear breakdown of CGST, SGST, and IGST portions for your reference.") }
    ],
    "sip-calculator": [
        { question: "How does the SIP calculator work?", answer: blockify("It calculates the future value of your monthly investments based on an expected annual return rate and the duration of your investment.") },
        { question: "Is the SIP return guaranteed?", answer: blockify("No, mutual fund investments are subject to market risks. This tool provides an estimate based on your projected growth rate.") },
        { question: "Can I calculate Step-up SIPs?", answer: blockify("This version focuses on fixed monthly installments. We recommend using a conservative average return for more realistic long-term planning.") },
        { question: "Why is a SIP better than a lumpsum?", answer: blockify("SIPs allow for rupee cost averaging and disciplined investing, which can reduce the impact of market volatility over time.") },
        { question: "Is my investment planning data secure?", answer: blockify("Yes, all calculation inputs stay on your device. We do not track your financial goals or investment amounts.") }
    ],
    "age-calculator": [
        { question: "How precisely can this tool calculate my age?", answer: blockify("Our Age Calculator provides your age in Years, Months, Weeks, Days, Hours, and even Seconds for maximum precision.") },
        { question: "Does it account for leap years?", answer: blockify("Yes, the algorithm accurately accounts for leap years and the varying number of days in each month.") },
        { question: "Can I calculate the age difference between two people?", answer: blockify("Yes, you can use the start and end date fields to determine the exact time difference between any two milestones.") },
        { question: "Is my birth data safe?", answer: blockify("Totally. Your birth date is processed locally and never stored or shared. Your privacy is paramount.") },
        { question: "Can I find out what day of the week I was born?", answer: blockify("Yes, the tool calculates the day of the week for your birth date or any target date you provide.") }
    ],
    "word-counter": [
        { question: "Is there a limit to the text I can count?", answer: blockify("No, you can paste large documents, and our optimized engine will process them instantly without lag.") },
        { question: "Does it count spaces and symbols?", answer: blockify("Yes, it provides a detailed breakdown of characters (with and without spaces), words, sentences, and paragraphs.") },
        { question: "Is my content sent to a database?", answer: blockify("Never. All text processing happens inside your browser. Your sensitive documents remain entirely private.") },
        { question: "Does it support multiple languages?", answer: blockify("Yes, our word counter works with any Latin-based or Unicode text, including Hindi and other Indian regional languages.") },
        { question: "Can I use this for SEO meta descriptions?", answer: blockify("Yes, it's perfect for checking character counts against SEO limits for titles and meta descriptions.") }
    ],
    "character-counter": [
        { question: "Why should I use this over a word processor?", answer: blockify("Our tool is lightweight, loads instantly, and provides real-time character stats optimized for social media and SEO limits.") },
        { question: "Does it differentiate between upper and lower case?", answer: blockify("It counts all characters equally, but you can use our 'Case Converter' tool if you need to transform the text.") },
        { question: "Is it safe for sensitive strings like passwords?", answer: blockify("Yes, because data stays in your browser's RAM and is never transmitted to us, it is safe for any text input.") },
        { question: "Does it work on mobile browsers?", answer: blockify("Yes, it is fully responsive and works perfectly on Chrome, Safari, and other mobile browsers.") },
        { question: "Can it count emojis?", answer: blockify("Yes, it correctly identifies emojis and special Unicode characters in your text.") }
    ],
    "case-converter": [
        { question: "What case formats are supported?", answer: blockify("We support UPPERCASE, lowercase, Title Case, Sentence case, and camelCase for developers.") },
        { question: "Does it mess up my formatting?", answer: blockify("No, it only changes the letter casing while preserving your paragraph structure and line breaks.") },
        { question: "Is it useful for coding?", answer: blockify("Absolutely. Developers use it to quickly convert strings to constant_case or camelCase for variables.") },
        { question: "Is there a text limit for conversion?", answer: blockify("There is no hard limit. You can convert entire articles or code blocks instantly.") },
        { question: "Can I undo a conversion?", answer: blockify("The tool provides instant output. You can always paste the original text back if you want to restart.") }
    ],
    "slug-generator": [
        { question: "Are the generated slugs SEO-friendly?", answer: blockify("Yes, we remove special characters and use hyphens to ensure your URLs are clean and search-engine optimized.") },
        { question: "Does it remove stop words?", answer: blockify("By default, it converts exactly what you type. We recommend manually removing short words like 'a' or 'the' for shorter URLs.") },
        { question: "Can I use it for WordPress or Shopify?", answer: blockify("Yes, the slugs follow standard URL conventions compatible with all major CMS platforms.") },
        { question: "Does it handle non-English characters?", answer: blockify("It transliterates or removes special characters to ensure the resulting slug contains only valid URL characters.") },
        { question: "Is it faster than manual typing?", answer: blockify("Much faster. Just paste your heading, and you get a perfect slug instantly.") }
    ],
    "bmi-calculator": [
        { question: "Is BMI a perfect health indicator?", answer: blockify("BMI is a useful screening tool for weight categories but doesn't account for muscle mass or body fat percentage directly.") },
        { question: "Does this tool work for children?", answer: blockify("This calculator is designed for adults (18+). Children's BMI is interpreted differently using age-and-sex-specific percentiles.") },
        { question: "Are my height and weight units supported?", answer: blockify("Yes, we support both Metric (cm/kg) and Imperial (feet/inches/lbs) units for your convenience.") },
        { question: "Is my health data private?", answer: blockify("Yes. Like all our calculators, your health inputs are processed locally and never stored.") },
        { question: "What are the BMI categories?", answer: blockify("Typically: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), and Obese (30 or more).") }
    ],
    "html-minify": [
        { question: "How much can minification speed up my site?", answer: blockify("By removing white spaces and comments, you can reduce file size by 10-20%, leading to faster load times.") },
        { question: "Does it break my HTML code?", answer: blockify("No, it only removes redundant characters that don't affect how the browser renders the page structure.") },
        { question: "Is it safe for production use?", answer: blockify("Yes, developers use this tool to optimize their code before deploying to live servers.") },
        { question: "Can I minify mixed HTML and CSS?", answer: blockify("Yes, internal CSS within <style> tags and JS within <script> tags will also be condensed.") },
        { question: "Where is my code processed?", answer: blockify("Processing happens 100% in your browser. Your source code is never uploaded to our servers.") }
    ],
    "json-formatter": [
        { question: "Can it fix broken JSON?", answer: blockify("It identifies syntax errors like missing commas or quotes to help you debug and fix your JSON data.") },
        { question: "Is it safe for sensitive API keys?", answer: blockify("Since all formatting happens locally in your browser, your sensitive config files are never exposed to the internet.") },
        { question: "What indentations are supported?", answer: blockify("You can choose between 2-space or 4-space indentation for a clean, readable look.") },
        { question: "Can it handle large JSON files?", answer: blockify("Yes, our engine is optimized to handle large datasets without freezing your browser.") },
        { question: "Can I minify JSON too?", answer: blockify("Yes, the tool allows you to switch between 'Beautify' for reading and 'Minify' for compact storage.") }
    ],
    "code-editor": [
        { question: "Which programming languages are supported?", answer: blockify("The editor supports syntax highlighting for major languages including JavaScript, HTML, CSS, JSON, and Python.") },
        { question: "Can I run the code here?", answer: blockify("This is currently a code viewer and editor with syntax highlighting, ideal for quick edits and snippet management.") },
        { question: "Does it have a dark mode?", answer: blockify("Yes, it automatically switches between light and dark themes to match your system preferences.") },
        { question: "Is my code saved automatically?", answer: blockify("The current version keeps code in your browser's local state. We recommend copying it before closing the tab.") },
        { question: "Is this safe for proprietary code?", answer: blockify("Yes, your code never leaves your local machine. It's a secure environment for quick snippets.") }
    ],
    "image-compressor": [
        { question: "How much quality is lost during compression?", answer: blockify("Our smart algorithm reduces file size while maintaining high visual fidelity. You likely won't notice a difference at 80% quality.") },
        { question: "Which image formats are supported?", answer: blockify("We support PNG, JPEG, and WebP, the most common formats for web performance.") },
        { question: "Are my photos uploaded to a cloud?", answer: blockify("No. Compression happens 100% in your browser. Your private photos are never sent to any server.") },
        { question: "Can I compress images in bulk?", answer: blockify("The current version processes images individually to ensure the highest quality and best results for each file.") },
        { question: "Is this tool free?", answer: blockify("Yes, you can compress as many images as you want without any watermark or subscription.") }
    ],
    "qr-code-generator": [
        { question: "Are these QR codes safe to use?", answer: blockify("Yes, the QR codes are generated locally and contain only the data you provide. There is no tracking or redirection.") },
        { question: "Can I use these for my business?", answer: blockify("Absolutely. These high-quality QR codes are perfect for menus, business cards, or product links.") },
        { question: "Do the QR codes expire?", answer: blockify("No, the QR codes are static and will work as long as the underlying link or text remains active.") },
        { question: "Can I customize the color?", answer: blockify("The generator creates high-contrast black and white codes for maximum readability by all scanning apps.") },
        { question: "Is my link data private?", answer: blockify("Your URL or text input resides only in your browser during the generation process.") }
    ],
    "image-to-text": [
        { question: "How accurate is the text extraction?", answer: blockify("We use high-performance OCR (Optical Character Recognition) which is very accurate for typed text on clean backgrounds.") },
        { question: "Does it support handwriting?", answer: blockify("It works best with printed text. Cursive or messy handwriting may yield less accurate results.") },
        { question: "Are my documents uploaded?", answer: blockify("No. The OCR engine runs locally in your browser (via Tesseract.js). Your documents remain private.") },
        { question: "Can I extract text from screenshots?", answer: blockify("Yes, it's perfect for pulling text from screenshots, scanned documents, or photos of articles.") },
        { question: "Which languages does it support?", answer: blockify("It currently supports English and common Latin-based character sets with high precision.") }
    ],
    "remove-extra-spaces": [
        { question: "How does this differ from the Word Counter?", answer: blockify("While it shares some logic, this tool specifically targets redundant spaces, tabs, and line breaks to clean up messy text.") },
        { question: "Does it remove paragraph breaks?", answer: blockify("You can choose to preserve single line breaks while removing multiple consecutive ones for a cleaner look.") },
        { question: "Is it safe for cleaning up code?", answer: blockify("Yes, many devs use it to clean up pasted snippets before formatting them in our JSON or HTML tools.") },
        { question: "Is my text data protected?", answer: blockify("Yes, like all Utils4You text tools, all processing is done locally on your device.") },
        { question: "Does it help reduce file size?", answer: blockify("Yes, removing extra spaces is a simple way to slightly reduce the size of large text or CSV files.") }
    ]
};

async function seedFaqs() {
    try {
        console.log('Fetching all tool documents...');
        const tools = await client.fetch(`*[_type == "tool"] { _id, "slug": slug.current }`);

        console.log(`Found ${tools.length} tools. Starting FAQ update...`);

        for (const tool of tools) {
            const faqs = toolFaqs[tool.slug];
            if (faqs) {
                console.log(`Updating FAQs for: ${tool.slug}`);
                // Add unique keys to avoid Sanity warnings
                const keyedFaqs = faqs.map((f, index) => ({
                    ...f,
                    _key: `faq_${index}`,
                    answer: f.answer.map((block, bIndex) => ({
                        ...block,
                        _key: `block_${bIndex}`,
                        children: block.children.map((span, sIndex) => ({
                            ...span,
                            _key: `span_${sIndex}`
                        }))
                    }))
                }));

                await client.patch(tool._id)
                    .set({ faqs: keyedFaqs })
                    .commit();
                console.log(`✅ Successfully updated ${tool.slug}`);
            } else {
                console.warn(`⚠️ No FAQs defined for slug: ${tool.slug}`);
            }
        }

        console.log('🚀 Tool FAQs seeding completed!');
    } catch (err) {
        console.error('❌ Error seeding FAQs:', err.message);
    }
}

seedFaqs();
