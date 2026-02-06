import { iconField } from '@/fields/iconField'
import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  dbName: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },

  fields: [
    /* =========================
     * Badge
     * ========================= */
    {
      name: 'showBadge',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'badgeText',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.showBadge,
      },
    },

    /* =========================
     * Main Heading
     * ========================= */
    {
      name: 'headingText',
      type: 'textarea',
      required: true,
    },

    {
      name: 'highlightStyle',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Underline', value: 'underline' },
      ],
    },

    /* =========================
     * Intro Text (Dynamic Replace)
     * ========================= */
    {
      name: 'introText',
      type: 'textarea',
    },

    /* =========================
     * Buttons
     * ========================= */
    {
      name: 'primaryCTA',
      type: 'group',

      fields: [
        {
          name: 'show',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'URL or page slug',
          },
        },
      ],
    },

    {
      name: 'secondaryCTA',
      type: 'group',

      fields: [
        {
          name: 'show',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'text',
        },
        {
          name: 'action',
          type: 'select',
          options: [
            { label: 'Download Resume', value: 'download-resume' },
            { label: 'Custom Link', value: 'custom-link' },
          ],
          dbName: 'action',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },

    /* =========================
     * Social Links (External Collection)
     * ========================= */
    {
      name: 'showSocialLinks',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'socialAccounts',
      type: 'relationship',
      relationTo: 'social-accounts',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.showSocialLinks,
        description: 'Select which social accounts to display in Hero',
      },
    },

    /* =========================
     * Hero Image (External Key)
     * ========================= */
    {
      name: 'showHeroImage',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'heroImageKey',
      type: 'text',
      admin: {
        description: 'Key resolved from personal details or global config',
        condition: (_, siblingData) => siblingData?.showHeroImage,
      },
    },

    /* =========================
     * Floating Badges
     * ========================= */
    {
      name: 'floatingBadges',
      type: 'array',
      dbName: 'floating_badges',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'position',
          type: 'select',
          required: true,
          options: [
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Right', value: 'top-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Middle Left', value: 'middle-left' },
            { label: 'Middle right', value: 'middle-right' },
            { label: 'Bottom Middle', value: 'bottom-middle' },
            { label: 'Top Middle', value: 'top-middle' },
          ],
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
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },

    /* =========================
     * Layout
     * ========================= */
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'image-right',
      options: [
        { label: 'Image Right', value: 'image-right' },
        { label: 'Image Left', value: 'image-left' },
      ],
    },
    {
      name: 'contentAlignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
  ],
}
