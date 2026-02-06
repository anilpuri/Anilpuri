import { CollectionConfig } from 'payload'
import { iconField } from '@/fields/iconField'
import { blocks } from '@/blocks'

export const Projects: CollectionConfig = {
  slug: 'projects',
  dbName: 'pro',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },

  fields: [
    /* ----------------- CORE PROJECT INFO ----------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { width: '50%', placeholder: 'Project title' },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: { width: '50%', placeholder: 'Optional subtitle or tagline' },
        },
      ],
    },
    {
      name: 'overview',
      type: 'textarea',
      admin: { placeholder: 'Short overview of the project' },
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Main banner image for the project' },
    },

    /* ----------------- ICON ----------------- */
    {
      type: 'group',
      label: 'Icon',
      admin: { description: 'Optional icon for this project' },
      fields: [
        {
          name: 'enableIcon',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Show icon' },
        },
        {
          ...iconField,
          admin: {
            ...iconField.admin,
            condition: (_, data) => Boolean(data?.enableIcon),
          },
        },
      ],
    },

    /* ----------------- PROJECT LINKS ----------------- */
    {
      name: 'links',
      type: 'array',
      admin: { description: 'External links related to the project' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { placeholder: 'Button or link label' },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { placeholder: 'https://example.com' },
        },
        iconField, // optional icon per link
      ],
    },

    /* ----------------- TECHNOLOGIES ----------------- */
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      admin: { description: 'Select technologies used in this project' },
    },

    /* ----------------- SETTINGS ----------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: { width: '33%', description: 'Order for project listing' },
        },
        {
          name: 'notes',
          type: 'textarea',
          admin: { width: '34%', description: 'Internal CMS notes' },
        },
      ],
    },

    /* ----------------- ADDITIONAL BLOCKS ----------------- */
    {
      name: 'style',
      type: 'select',
      label: 'Page Style',
      options: [
        { label: 'Style 1', value: 'style1' },
        { label: 'Style 2', value: 'style2' },
        { label: 'Style 3', value: 'style3' },
      ],
      defaultValue: 'style1',
      admin: {
        description: 'Choose the visual style for the project page',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks,
      admin: { description: 'Add additional sections to the project page' },
    },
    {
      name: 'asideBlocks',
      type: 'blocks',
      blocks,
      admin: { description: 'Add additional aside sections to the project page' },
    },
  ],
}
