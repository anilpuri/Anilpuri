import { CollectionConfig } from 'payload'
import { iconField } from '@/fields/iconField'

export const SocialAccounts: CollectionConfig = {
  slug: 'social-accounts',
  dbName: 'soc',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
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
              name: 'name',
              type: 'text',
              required: true,
              admin: { placeholder: 'LinkedIn, GitHub, Twitter...' },
            },
            {
              name: 'profileLink',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'https://github.com/username',
                description: 'Full URL to the social profile',
              },
            },
          ],
        },

        /* ---------------- ICON ---------------- */
        {
          label: 'Icon',
          fields: [iconField],
        },

        /* ---------------- SETTINGS ---------------- */
        {
          label: 'Settings',
          fields: [
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: { description: 'Order in which this account appears' },
            },

            {
              name: 'note',
              type: 'textarea',
              admin: { description: 'Optional note or internal reference' },
            },
          ],
        },
      ],
    },
  ],
}
