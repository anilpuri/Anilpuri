import { Block } from 'payload'

export const SectionHead: Block = {
  slug: 'section-head',
  dbName: 'sech',

  labels: { singular: 'Section Head', plural: 'Section Heads' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'slug',
      type: 'text',
      admin: { description: 'URL-friendly slug' },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'style1',
      options: [
        { label: 'Style 1', value: 'style1' },
        { label: 'Style 2', value: 'style2' },
        { label: 'Style 3', value: 'style3' },
      ],
      admin: { description: 'Choose the visual style for this section' },
    },
  ],
}
