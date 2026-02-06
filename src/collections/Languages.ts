import { CollectionConfig } from 'payload'

export const Languages: CollectionConfig = {
  slug: 'languages',
  dbName: 'lang',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'level'], // show key info in list view
  },

  fields: [
    /* ---------------- LANGUAGE NAME ---------------- */
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'English, Hindi, Spanish…',
        description: 'Name of the language',
      },
    },

    /* ---------------- PROFICIENCY LEVEL ---------------- */
    {
      name: 'level',
      type: 'select',
      required: false,
      options: [
        { label: 'Not defined', value: '' },
        { label: 'Basic', value: 'basic' },
        { label: 'Conversational', value: 'conversational' },
        { label: 'Fluent', value: 'fluent' },
        { label: 'Native', value: 'native' },
      ],
      admin: {
        description: 'Optional proficiency level',
        placeholder: 'Select proficiency',
      },
    },
  ],
}
