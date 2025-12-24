export default {
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
    },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon Name (Lucide)", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "content", title: "Content", type: "text" },
          ],
        },
      ],
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        {
          type: "object",
          name: "contactSection",
          title: "Contact Section",
          fields: [
            { name: "title", type: "string" },
            { name: "content", type: "text" },
            { name: "email", type: "string" },
          ],
        },
      ],
    },
    {
      name: "footer",
      title: "Footer CTA",
      type: "object",
      fields: [
          { name: "title", type: "string" },
          { name: "description", type: "text" },
          { name: "buttonText", type: "string" },
          { name: "buttonLink", type: "string" },
      ]
    },
    {
      name: "seo",
      title: "SEO Overrides",
      type: "object",
      fields: [
        { name: "title", title: "Title Override", type: "string" },
        { name: "description", title: "Description Override", type: "text" },
        { name: "keywords", title: "Keywords Override", type: "array", of: [{ type: "string" }] },
        { name: "ogImage", title: "Open Graph Image Override", type: "image", options: { hotspot: true } },
      ],
    },
  ],
};
