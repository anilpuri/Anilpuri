import { CollectionConfig } from 'payload'
import { iconField } from '@/fields/iconField'

export const Achievements: CollectionConfig = {
  slug: 'achievements',
  dbName: 'achi',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'date', 'isFeatured'],
    description: 'Manage awards, certifications, and recognitions.',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ===================== DETAILS ===================== */
        {
          label: 'Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Award or Certification name',
              },
            },

            {
              name: 'organization',
              type: 'text',
              admin: {
                placeholder: 'Awarding body / organization',
              },
            },

            {
              name: 'date',
              type: 'date',
              required: true,
              admin: {
                description: 'Date the achievement was awarded',
              },
            },

            {
              name: 'description',
              type: 'textarea',
              admin: {
                placeholder: 'Short description or context (optional)',
              },
            },
          ],
        },

        /* ===================== VISUAL ===================== */
        {
          label: 'Visual',
          fields: [
            {
              type: 'group',
              label: 'Icon Settings',
              admin: {
                description: 'Optional icon shown with this achievement',
              },
              fields: [iconField],
            },

            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Achievement',
              defaultValue: false,
              admin: {
                description: 'Highlight this on homepage or key sections',
              },
            },
          ],
        },

        /* ===================== ADVANCED ===================== */
        {
          label: 'Advanced',
          fields: [
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first',
              },
            },
            {
              name: 'notes',
              type: 'textarea',
              admin: {
                description: 'Internal notes (not shown on site)',
              },
            },
          ],
        },
      ],
    },
  ],
}
