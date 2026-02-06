import { Block } from 'payload'
import { iconField } from '../fields/iconField'

export const GridCards: Block = {
  slug: 'gridCards',
  dbName: 'gc',
  labels: {
    singular: 'Grid Cards',
    plural: 'Grid Cards',
  },

  fields: [
    /* ---------------- GRID SETTINGS ---------------- */
    {
      name: 'itemsPerRow',
      type: 'number',
      label: 'Items Per Row',
      required: true,
      defaultValue: 3,
      min: 1,
      max: 5,
    },

    /* ---------------- SOURCE TYPE ---------------- */
    {
      name: 'sourceType',
      type: 'radio',
      label: 'Content Source',
      required: true,
      defaultValue: 'manual',
      options: [
        { label: 'Manual', value: 'manual' },
        { label: 'Collection', value: 'collection' },
      ],
    },

    /* =====================================================
       MANUAL MODE
    ===================================================== */
    {
      name: 'manualConfig',
      type: 'group',

      admin: {
        condition: (_, siblingData) => siblingData.sourceType === 'manual',
      },
      fields: [
        {
          name: 'style',
          type: 'radio',
          label: 'Card Style',
          required: true,
          defaultValue: 'styleOne',
          options: [
            { label: 'Style One', value: 'styleOne' },
            { label: 'Style Two', value: 'styleTwo' },
          ],
        },

        {
          name: 'cards',
          type: 'array',
          label: 'Cards',
          minRows: 1,
          fields: [
            {
              type: 'group',
              label: 'Icon',
              admin: {
                description: 'Optional icon for this education entry',
              },
              fields: [
                {
                  name: 'enableIcon',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Show icon',
                  },
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

            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'date',
              type: 'date',
              admin: {
                condition: (_, siblingData) => siblingData?.manualConfig?.style === 'styleTwo',
              },
            },
          ],
        },
      ],
    },

    /* =====================================================
       COLLECTION MODE
    ===================================================== */
    {
      name: 'collectionConfig',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.sourceType === 'collection',
      },
      fields: [
        {
          name: 'collection',
          type: 'select',
          label: 'Select Collection',
          required: true,
          options: [
            { label: 'Achievements', value: 'achievements' },
            { label: 'Certifications', value: 'certifications' },
            { label: 'Education', value: 'education' },
            { label: 'Experience', value: 'experience' },
            { label: 'Projects', value: 'projects' },
            { label: 'Skill Categories', value: 'skill-categories' },
            { label: 'Skills', value: 'skills' },
          ],
        },

        {
          name: 'fetchType',
          type: 'radio',
          label: 'Fetch Type',
          required: true,
          defaultValue: 'infinite',
          options: [
            { label: 'Infinite', value: 'infinite' },
            { label: 'Selective', value: 'selective' },
          ],
        },

        /* ---------- SELECTIVE ---------- */
        {
          name: 'items',
          type: 'relationship',
          relationTo: [
            'achievements',
            'certifications',
            'education',
            'experience',
            'projects',
            'skill-categories',
            'skills',
          ],
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData.fetchType === 'selective',
          },
          filterOptions: ({ relationTo, siblingData }) => {
            // siblingData.collection is the value from the select field above
            // relationTo is the collection currently being queried by the drawer

            // If the drawer is trying to load a collection that doesn't match our selection,
            // return a query that finds nothing (effectively disabling that option).
            if (siblingData?.collection && relationTo !== siblingData.collection) {
              return { id: { exists: false } }
            }

            // Otherwise, return true (or empty object) to allow selection
            return {}
          },
        },

        /* ---------- INFINITE ---------- */
        {
          name: 'paginationType',
          type: 'radio',
          defaultValue: 'loadMore',
          options: [
            { label: 'Load More', value: 'loadMore' },
            { label: 'Pagination', value: 'pagination' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.fetchType === 'infinite',
          },
        },
        {
          name: 'itemsPerPage',
          type: 'number',
          defaultValue: 6,
          admin: {
            condition: (_, siblingData) => siblingData.fetchType === 'infinite',
          },
        },
      ],
    },
  ],
}
