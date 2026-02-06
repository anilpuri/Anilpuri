'use client'

import React from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import Icon from '@/components/ui/icon'

const Certifications = ({ item, idx = 0 }) => {
  const { title, issuingOrganization, issueDate, expiryDate, notes, icon, enableIcon, isActive } =
    item

  if (!isActive) return null

  const formatDate = (date?: string) => (date ? moment(date).format('MMM YYYY') : null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-slate-100 p-8 rounded-3xl border border-slate-100
                 hover:border-primary/20 hover:shadow-xl transition-all group"
    >
      {/* Icon */}
      {enableIcon && icon && <Icon icon={icon} />}

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>

      {/* Issuing Organization */}
      {issuingOrganization && (
        <p className="text-sm font-medium text-slate-600 mb-1">{issuingOrganization}</p>
      )}

      {/* Dates */}
      {(issueDate || expiryDate) && (
        <p className="text-xs text-slate-500 mb-4">
          {formatDate(issueDate)}
          {expiryDate ? ` – ${formatDate(expiryDate)}` : ' · No Expiry'}
        </p>
      )}

      {/* Notes */}
      {notes && <p className="text-slate-500 leading-relaxed">{notes}</p>}
    </motion.div>
  )
}

export default Certifications
