export default {
    name: "homepage",
    title: "Homepage",
    type: "document",
    fields: [
        {
            name: "hero",
            title: "Hero Section",
            type: "object",
            fields: [
                {
                    name: "title",
                    title: "Title",
                    type: "string",
                    description: "Main headline",
                },
                {
                    name: "highlightedText",
                    title: "Highlighted Text",
                    type: "string",
                    description: "Text to highlight with gradient",
                },
                {
                    name: "subtitle",
                    title: "Subtitle",
                    type: "text",
                    description: "Supporting text below title",
                },
            ],
        },
        {
            name: "benefits",
            title: "Benefits Section",
            type: "object",
            fields: [
                {
                    name: "heading",
                    title: "Section Heading",
                    type: "string",
                },
                {
                    name: "description",
                    title: "Description",
                    type: "text",
                },
            ],
        },
        {
            name: "features",
            title: "Feature Cards",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                        },
                        {
                            name: "description",
                            title: "Description",
                            type: "text",
                        },
                        {
                            name: "icon",
                            title: "Icon Name",
                            type: "string",
                            description: "SVG path identifier (e.g., 'text', 'calculator')",
                        },
                        {
                            name: "link",
                            title: "Link",
                            type: "string",
                        },
                        {
                            name: "colorScheme",
                            title: "Color Scheme",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Indigo", value: "indigo" },
                                    { title: "Cyan", value: "cyan" },
                                    { title: "Green", value: "green" },
                                    { title: "Purple", value: "purple" },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: "stats",
            title: "Statistics",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "number",
                            title: "Number",
                            type: "string",
                            description: "e.g., '50+', '10K+'",
                        },
                        {
                            name: "label",
                            title: "Label",
                            type: "string",
                        },
                        {
                            name: "icon",
                            title: "Icon",
                            type: "string",
                            description: "Lucide icon name",
                        },
                    ],
                },
            ],
        },
        {
            name: "cta",
            title: "Call to Action",
            type: "object",
            fields: [
                {
                    name: "heading",
                    title: "Heading",
                    type: "string",
                },
                {
                    name: "description",
                    title: "Description",
                    type: "text",
                },
                {
                    name: "buttonText",
                    title: "Button Text",
                    type: "string",
                },
                {
                    name: "buttonLink",
                    title: "Button Link",
                    type: "string",
                },
            ],
        },
    ],
};
