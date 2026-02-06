import { CollectionConfig } from 'payload'
import { iconField } from '@/fields/iconField'

export const Education: CollectionConfig = {
  slug: 'education',
  dbName: 'edu',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'degree',
    defaultColumns: ['degree', 'institution', 'isCurrent', 'order'],
    description: 'Manage academic education details.',
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
              type: 'row',
              fields: [
                {
                  name: 'degree',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: 'Bachelor of Science, Master of Arts',
                  },
                },
                {
                  name: 'institution',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: 'University or College Name',
                  },
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'fieldOfStudy',
                  type: 'text',
                  admin: {
                    width: '50%',
                    placeholder: 'Computer Science, Economics, Design…',
                  },
                },
                {
                  name: 'grade',
                  type: 'text',
                  admin: {
                    width: '50%',
                    placeholder: 'CGPA, Percentage, Honors',
                  },
                },
              ],
            },
          ],
        },

        /* ===================== DATES ===================== */
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
                  admin: {
                    width: '33%',
                    description: 'Start date of the program',
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    width: '33%',
                    condition: (_, data) => !data?.isCurrent,
                    description: 'End date (hidden if currently studying)',
                  },
                },
                {
                  name: 'isCurrent',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Currently Studying',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },

        /* ===================== ACHIEVEMENTS ===================== */
        {
          label: 'Achievements',
          fields: [
            {
              name: 'achievements',
              type: 'array',
              admin: {
                description: 'Awards, honors, or recognitions during this education',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Dean’s List, Scholarship, Top Performer',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    placeholder: 'Optional details',
                  },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
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
                description: 'Optional icon shown alongside education entry',
              },
              fields: [iconField],
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
          ],
        },
      ],
    },
  ],
}
