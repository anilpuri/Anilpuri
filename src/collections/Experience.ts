import { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  dbName: 'expe',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['company', 'role', 'isCurrent', 'order'],
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
              type: 'row',
              fields: [
                {
                  name: 'company',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', placeholder: 'Company name' },
                },
                {
                  name: 'role',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', placeholder: 'Job title / Role' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'City, Country' },
                },
                {
                  name: 'employmentType',
                  type: 'select',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Full-Time', value: 'full-time' },
                    { label: 'Part-Time', value: 'part-time' },
                    { label: 'Contract', value: 'contract' },
                    { label: 'Internship', value: 'internship' },
                  ],
                },
              ],
            },
          ],
        },

        /* ---------------- DURATION ---------------- */
        {
          label: 'Duration',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                  admin: { width: '33%' },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    width: '33%',
                    description: 'Leave empty if current',
                  },
                },
                {
                  name: 'isCurrent',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: { width: '33%', description: 'Currently working here' },
                },
              ],
            },
          ],
        },

        /* ---------------- TECHNOLOGIES ---------------- */
        {
          label: 'Technologies',
          fields: [
            {
              name: 'technologies',
              type: 'relationship',
              relationTo: 'skills',
              hasMany: true,
              admin: { description: 'Select skills or technologies used' },
            },
          ],
        },

        /* ---------------- EXPERIENCE HIGHLIGHTS ---------------- */
        {
          label: 'Highlights',
          fields: [
            {
              name: 'experiencePoints',
              type: 'array',
              label: 'Experience Highlights',
              admin: {
                description: 'Key responsibilities or achievements',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { placeholder: 'Example: Implemented scalable API' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { rows: 3, placeholder: 'Optional details or impact' },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Hide this point without deleting' },
                },
              ],
            },
          ],
        },

        /* ---------------- SETTINGS ---------------- */
        {
          label: 'Settings',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'order',
                  type: 'number',
                  defaultValue: 0,
                  admin: { width: '50%', description: 'Display order (lower comes first)' },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '50%', description: 'Show or hide this experience' },
                },
              ],
            },
            {
              name: 'notes',
              type: 'textarea',
              admin: { rows: 2, description: 'Internal notes (not shown on site)' },
            },
          ],
        },
      ],
    },
  ],
}
