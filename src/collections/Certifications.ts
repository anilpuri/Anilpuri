import { CollectionConfig } from 'payload'
import { iconField } from '@/fields/iconField'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  dbName: 'certi',
  versions: {
    drafts: true, // 👈 Enables Draft / Publish
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuingOrganization', 'issueDate', 'expiryDate', 'isFeatured'],
    description: 'Manage professional certifications and credentials.',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ===================== DETAILS ===================== */
        {
          label: 'Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Certificate or Course Name',
              },
            },

            {
              name: 'issuingOrganization',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Issuing organization or institution',
              },
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'issueDate',
                  type: 'date',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'expiryDate',
                  type: 'date',
                  admin: {
                    width: '50%',
                    description: 'Leave empty if the certification does not expire',
                  },
                },
              ],
            },

            {
              name: 'notes',
              type: 'textarea',
              admin: {
                description: 'Optional description or context (not shown publicly)',
              },
            },
          ],
        },

        /* ===================== VERIFICATION ===================== */
        {
          label: 'Verification',
          fields: [
            {
              name: 'credentialID',
              type: 'text',
              admin: {
                placeholder: 'Certificate ID (optional)',
              },
            },

            {
              name: 'credentialURL',
              type: 'text',
              admin: {
                placeholder: 'https://verify.example.com/...',
                description: 'Public URL to verify this certification',
              },
            },
          ],
        },

        /* ===================== VISUAL ===================== */

        {
          label: 'Visual',
          fields: [
            {
              type: 'group',
              label: 'Icon Settings',
              admin: {
                description: 'Optional icon displayed with this certification',
              },
              fields: [iconField],
            },

            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Certification',
              defaultValue: false,
              admin: {
                description: 'Highlight this certification on homepage or key sections',
              },
            },
          ],
        },

        /* ===================== ADVANCED ===================== */
        {
          label: 'Advanced',
          fields: [
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first',
              },
            },
          ],
        },
      ],
    },
  ],
}
