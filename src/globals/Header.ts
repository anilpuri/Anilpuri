import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    // 🔹 LOGO SETTINGS
    {
      type: 'group',
      name: 'logo',
      label: 'Logo',
      admin: {
        description: 'Logo settings shown in header',
      },
      fields: [
        {
          name: 'type',
          label: 'Logo Type',
          type: 'radio',
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Image Upload', value: 'image' },
            { label: 'Image URL', value: 'url' },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'text',
          label: 'Logo Text',
          type: 'text',
          admin: {
            placeholder: 'My Brand',
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'highlight',
          label: 'Logo Highlight Text',
          type: 'text',
          admin: {
            placeholder: '.',
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'image',
          label: 'Logo Image Upload',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'imageUrl',
          label: 'Logo Image URL',
          type: 'text',
          admin: {
            placeholder: 'https://example.com/logo.png',
            condition: (_, siblingData) => siblingData?.type === 'url',
          },
        },
      ],
    },

    // 🔹 NAVIGATION LINKS
    {
      name: 'navItems',
      label: 'Navigation Links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          label: 'Open in new tab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
