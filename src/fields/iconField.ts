import { Field } from 'payload'

export const iconField: Field = {
  name: 'icon',
  type: 'group',
  label: 'Icon Settings',
  admin: {
    description: 'Optional icon shown with this achievement',
  },
  fields: [
    /* ================= ENABLE ICON ================= */
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Icon',
      defaultValue: false,
    },

    /* ================= ICON TYPE ================= */
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'lib',
      dbName: 'icon_lib',
      admin: {
        width: '50%',
        condition: (_, siblingData) => siblingData?.enabled,
      },
      options: [
        { label: 'Icon Library', value: 'lib' },
        { label: 'Uploaded Image', value: 'image' },
      ],
    },

    /* ================= LIBRARY ICON ================= */
    {
      name: 'lib',
      type: 'group',
      label: 'Library Icon',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled && siblingData?.type === 'lib',
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
                placeholder: 'arrow-right',
                description: 'Icon name',
              },
            },
          ],
        },
      ],
    },

    /* ================= IMAGE ICON ================= */
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Uploaded Icon',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled && siblingData?.type === 'image',
      },
    },

    /* ================= ICON STYLE ================= */
    {
      name: 'style',
      type: 'group',
      label: 'Icon Style',
      admin: {
        description: 'Optional visual styling',
        condition: (_, siblingData) => siblingData?.enabled,
      },
      fields: [
        {
          name: 'styleEnabled',
          type: 'checkbox',
          label: 'Enable Styling',
          defaultValue: false,
        },
        {
          name: 'color',
          type: 'text',
          label: 'Icon Color',
          admin: {
            condition: (_, siblingData) => siblingData?.styleEnabled,
            components: { Field: '@/components/ui/TailwindColorPicker', },
          },
        },
        {
          name: 'bg-color',
          type: 'text',
          label: 'Background Color',
          admin: {
            condition: (_, siblingData) => siblingData?.styleEnabled,
            components: { Field: '@/components/ui/TailwindColorPicker',},
          },
        },
        {
          name: 'shape',
          type: 'select',
          defaultValue: 'none',
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.styleEnabled,
          },
          options: [
            { label: 'None', value: 'none' },
            { label: 'Rounded', value: 'rounded' },
            { label: 'Circle', value: 'circle' },
            { label: 'Square', value: 'square' },
          ],
        },
      ],
    },
  ],
}
