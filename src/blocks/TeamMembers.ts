import { iconField } from '@/fields/iconField'
import { Block } from 'payload'

export const TeamMembers: Block = {
  slug: 'team-members',
  dbName: 'team',
  labels: {
    singular: 'Team Members',
    plural: 'Team Members Blocks',
  },
  fields: [
    /* =====================
       Section Heading
    ====================== */
    {
      name: 'heading',
      type: 'group',
      label: 'Block Heading',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Team Members',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            placeholder: 'People who contributed to this project',
          },
        },
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
    },

    /* =====================
       Team Members List
    ====================== */
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      admin: {
        initCollapsed: false,
      },
      fields: [
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
              name: 'role',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'Role / Responsibility',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              type: 'email',
              admin: {
                width: '50%',
                placeholder: 'name@example.com',
              },
            },
            {
              name: 'profileUrl',
              type: 'text',
              admin: {
                width: '50%',
                placeholder: 'https://github.com/username',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              admin: {
                width: '70%',
              },
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                width: '30%',
                description: 'Mark as active contributor',
              },
            },
          ],
        },
      ],
    },

    /* =====================
       Display Options
    ====================== */
    {
      name: 'displayOptions',
      type: 'group',
      label: 'Display Options',
      admin: {
        description: 'Visual behavior controlled by renderer',
      },
      fields: [
        {
          name: 'showEmail',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showStatus',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'inactiveStyle',
          type: 'select',
          defaultValue: 'faded',
          options: [
            { label: 'Faded', value: 'faded' },
            { label: 'Labeled', value: 'labeled' },
            { label: 'Faded + Label', value: 'both' },
          ],
        },
      ],
    },
  ],
}
