import { Block } from 'payload'

export const SEO: Block = {
  slug: 'seo',
  labels: {
    singular: 'SEO Settings',
    plural: 'SEO Settings',
  },

  fields: [
    // 🔹 BASIC SEO
    {
      type: 'group',
      label: 'Basic SEO',
      admin: {
        description: 'Search engine metadata',
      },
      fields: [
        {
          name: 'title',
          label: 'Meta Title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Page title for search engines',
            description: 'Recommended: 50–60 characters',
          },
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          required: true,
          admin: {
            placeholder: 'Short description for search results',
            description: 'Recommended: 150–160 characters',
          },
        },
      ],
    },

    // 🔹 SOCIAL SHARING
    {
      type: 'group',
      label: 'Social Sharing',
      admin: {
        description: 'Preview when shared on social platforms',
      },
      fields: [
        {
          name: 'image',
          label: 'Social Image (Open Graph)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Recommended size: 1200×630',
          },
        },
      ],
    },

    // 🔹 ADVANCED
    {
      type: 'group',
      label: 'Advanced',
      fields: [
        {
          name: 'noIndex',
          label: 'Hide from search engines',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'canonicalUrl',
          label: 'Canonical URL',
          type: 'text',
          admin: {
            placeholder: 'https://example.com/page',
          },
        },
      ],
    },
  ],
}
