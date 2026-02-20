export default {
    name: "example",
    title: "Example",
    type: "object",
    fields: [
        {
            name: "scenario",
            title: "Scenario",
            type: "string",
            description: "A short title or scenario description (e.g., 'A ₹5,00,000 car loan at 9.5% for 5 years')",
        },
        {
            name: "explanation",
            title: "Explanation",
            type: "text",
            description: "Detailed explanation of the output for this scenario.",
        },
    ],
};
