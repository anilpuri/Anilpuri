import { Block } from 'payload'

export const GetInTouch: Block = {
  slug: 'get-in-touch',
  dbName: 'gitc',

  labels: {
    singular: 'Get In Touch Section',
    plural: 'Get In Touch Sections',
  },

  fields: [
    // ===== Section Heading =====

    // ===== Visibility Toggles =====
    {
      name: 'visibility',
      type: 'group',

      fields: [
        {
          name: 'showEmail',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Email',
        },
        {
          name: 'showLocation',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Location',
        },
        {
          name: 'showQuote',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Quote',
        },
        {
          name: 'showForm',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Contact Form',
        },
      ],
    },

    // ===== Quote =====
    {
      name: 'quote',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.visibility?.showQuote,
      },
      defaultValue: 'Great web design without functionality is like a sports car with no engine.',
    },

    // ===== Form UI Text =====
    {
      name: 'form',
      type: 'group',

      admin: {
        condition: (_, siblingData) => siblingData?.visibility?.showForm,
      },
      fields: [
        { name: 'nameLabel', type: 'text', defaultValue: 'Name' },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email' },
        { name: 'messageLabel', type: 'text', defaultValue: 'Message' },
        {
          name: 'messagePlaceholder',
          type: 'text',
          defaultValue: 'Tell me about your project...',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Send Message',
        },
      ],
    },
  ],
}
