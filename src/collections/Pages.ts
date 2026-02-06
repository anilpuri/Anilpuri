import { CollectionConfig } from 'payload'
import { blocks } from '@/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  dbName: 'pg',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Manage static and dynamic pages with flexible layouts.',
  },

  fields: [
    /* --------------------------------- META --------------------------------- */

    {
      type: 'tabs',
      tabs: [
        /* ===================== CONTENT TAB ===================== */
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Page title',
                description: 'This is used as the page heading and admin title.',
              },
            },

            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'about-us',
                description: 'URL path (without leading slash)',
              },
            },

            {
              name: 'layout',
              type: 'blocks',
              blocks,
              admin: {
                description: 'Build the page using flexible content blocks.',
              },
            },
          ],
        },

        /* ===================== SETTINGS TAB ===================== */
        {
          label: 'Settings',
          fields: [
            {
              name: 'pageSettings',
              type: 'group',
              label: 'Page Visibility',
              admin: {
                description: 'Control global page elements',
              },
              fields: [
                {
                  name: 'showHeader',
                  type: 'checkbox',
                  label: 'Show Header',
                  defaultValue: true,
                },
                {
                  name: 'showFooter',
                  type: 'checkbox',
                  label: 'Show Footer',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
