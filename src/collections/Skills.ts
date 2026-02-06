import { CollectionConfig } from 'payload'
import { iconField } from '@/fields/iconField'

export const Skills: CollectionConfig = {
  slug: 'skills',
  dbName: 'ski',

  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'skill-categories',
      required: true,
    },
    {
      type: 'group',
      label: 'Icon',
      admin: {
        description: 'Optional icon for this education entry',
      },
      fields: [iconField],
    }, // 👈 reused here

    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'Proficiency',
      type: 'select',
      required: false,
      defaultValue: '',
      options: [
        { label: 'Not defined', value: '' },
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
      admin: {
        description: 'Overall proficiency level for this skill (optional)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
