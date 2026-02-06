import { CollectionConfig } from 'payload'
import { iconField } from '../fields/iconField'

export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  dbName: 'skic',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'isActive'],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ---------------- BASIC INFO ---------------- */
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Category name, e.g., Frontend, Backend',
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Order in which categories are displayed',
              },
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show or hide this category without deleting',
              },
            },
          ],
        },

        /* ---------------- ICON ---------------- */
        {
          label: 'Icon',
          fields: [iconField],
        },

        /* ---------------- INTERNAL ---------------- */
        {
          label: 'Internal',
          fields: [
            {
              name: 'notes',
              type: 'textarea',
              admin: { description: 'Internal notes for this category' },
            },
          ],
        },
        {
          label: 'Skills',
          fields: [
            {
              name: 'relatedSkills',
              type: 'join',
              collection: 'skills', // Slug of your skills collection
              on: 'category', // Field in 'skills' that points to this category
              admin: {
                allowCreate: true,
                description: 'List of skills belonging to this category (populated automatically)',
              },
            },
          ],
        },
      ],
    },
  ],
}
