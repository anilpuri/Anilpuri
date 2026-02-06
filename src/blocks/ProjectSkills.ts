import { iconField } from '@/fields/iconField'
import { Block } from 'payload'

export const projectSkills: Block = {
  slug: 'project-skills',
  dbName: 'project_skills',
  labels: {
    singular: 'Project Skill',
    plural: 'Project Skills',
  },
  fields: [
    /* =====================
       Section Title
    ====================== */
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        placeholder: 'Skill title (e.g., Frontend, Backend)',
      },
    },

    /* =====================
       Icon
    ====================== */
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
  ],
}
