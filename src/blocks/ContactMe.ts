import { Block } from 'payload'

export const ContactMe: Block = {
  slug: 'contact-me',
  dbName: 'contact_me',
  labels: {
    singular: 'Contact Me',
    plural: 'Contact Me Blocks',
  },
  fields: [
    /* =====================
       Section Title
    ====================== */
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Like what you see?',
      admin: {
        placeholder: 'Section title',
      },
    },

    /* =====================
       Section Subtitle
    ====================== */
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: "I'm currently available for new opportunities.",
      admin: {
        placeholder: 'Optional subtitle',
      },
    },

    /* =====================
       Link Text
    ====================== */
    {
      name: 'linkText',
      type: 'text',
      label: 'Link Text',
      defaultValue: 'Contact Me',
      admin: {
        placeholder: 'Text for the link or button',
      },
    },

    /* =====================
       Link URL
    ====================== */
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
      defaultValue: '/#contact',
      admin: {
        placeholder: 'URL for the link or button',
      },
    },
  ],
}
