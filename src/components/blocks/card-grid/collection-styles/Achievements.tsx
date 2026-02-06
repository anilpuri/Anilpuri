'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/ui/icon'

const AchievementCard = ({ item, idx = 0 }) => {
  const { title, organization, date, description, icon, enableIcon, isActive } = item
  if (!isActive) return null

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
      {enableIcon && <Icon icon={icon} />}

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>

      {/* Organization */}
      {organization && <p className="text-sm font-medium text-slate-600 mb-1">{organization}</p>}

      {/* Date */}
      {date && (
        <p className="text-xs text-slate-500 mb-4">
          {new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
          })}
        </p>
      )}

      {/* Description */}
      {description && <p className="text-slate-500 leading-relaxed">{description}</p>}
    </motion.div>
  )
}

export default AchievementCard
