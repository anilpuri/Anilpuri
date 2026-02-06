import { CollectionConfig } from 'payload'

export const PersonalDetails: CollectionConfig = {
  slug: 'personal-details',
  dbName: 'pde',

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'jobTitle', 'email'],
  },

  access: {
    read: () => true,
    create: async ({ req }) => {
      const existing = await req.payload.find({
        collection: 'personal-details',
        limit: 1,
      })
      return existing.totalDocs === 0
    },
    update: () => true,
    delete: () => false,
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
              name: 'fullName',
              type: 'text',
              required: true,
              admin: { placeholder: 'John Doe' },
            },
            {
              name: 'jobTitle',
              type: 'text',
              admin: { placeholder: 'Frontend Developer, UI/UX Designer…' },
            },
            {
              name: 'bio',
              type: 'textarea',
              admin: { placeholder: 'Write a short bio or personal description' },
            },
          ],
        },

        /* ---------------- PROFILE PICTURE ---------------- */
        {
          label: 'Profile Picture',
          fields: [
            {
              name: 'profilePicture',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Upload a profile picture' },
            },
          ],
        },

        /* ---------------- CONTACT ---------------- */
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
              admin: { placeholder: 'john.doe@example.com' },
            },
            {
              name: 'phone',
              type: 'text',
              admin: { placeholder: '+91 98765 43210' },
            },
            {
              name: 'location',
              type: 'text',
              admin: { placeholder: 'City, Country' },
            },
          ],
        },

        /* ---------------- RESUME ---------------- */
        {
          label: 'Resume',
          fields: [
            {
              name: 'resume',
              label: 'Resume (PDF)',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: { description: 'Upload resume in PDF format only' },
              filterOptions: { mimeType: { equals: 'application/pdf' } },
            },
          ],
        },
      ],
    },
  ],
}
