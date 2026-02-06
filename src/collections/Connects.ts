import { CollectionConfig } from 'payload'

export const Connects: CollectionConfig = {
  slug: 'connects',
  dbName: 'git',

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'subject', 'isRead', 'submittedAt'],
  },

  access: {
    read: () => true, // Admins can read
    create: () => true, // Frontend form submission allowed
    update: () => true, // Prevent editing submissions
    delete: () => false, // Prevent deletion (audit trail)
  },

  fields: [
    /* ---------------- SENDER INFO ---------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'Full name',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'Email address',
          },
        },
      ],
    },

    {
      name: 'subject',
      type: 'text',
      admin: {
        placeholder: 'Subject of the message',
      },
    },

    /* ---------------- MESSAGE ---------------- */
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        rows: 6,
        placeholder: 'User message',
      },
    },

    /* ---------------- STATUS & META ---------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'isRead',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
            description: 'Mark as read after reviewing',
          },
        },
        {
          name: 'submittedAt',
          type: 'date',
          defaultValue: () => new Date(),
          admin: {
            width: '67%',
            readOnly: true,
            description: 'Submission timestamp',
          },
        },
      ],
    },
  ],
}
