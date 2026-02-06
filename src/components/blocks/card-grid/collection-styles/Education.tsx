'use client'

import React from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import Icon from '@/components/ui/icon'

const Education = ({ item, idx = 0 }) => {
  const {
    degree,
    institution,
    fieldOfStudy,
    grade,
    startDate,
    endDate,
    isCurrent,
    achievements,
    enableIcon,
    icon,
    isActive,
  } = item

  if (!isActive) return null

  const formatDate = (date?: string) => (date ? moment(date).format('MMM YYYY') : null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-slate-100 p-8 rounded-3xl border border-slate-100
                 hover:border-primary/20 hover:shadow-xl transition-all"
    >
      {/* Icon */}
      {enableIcon && icon && (
        <div className="mb-4">
          <Icon icon={icon} />
        </div>
      )}

      {/* Degree */}
      <h3 className="text-xl font-bold text-slate-900">{degree}</h3>

      {/* Institution */}
      <p className="text-sm font-medium text-slate-600">{institution}</p>

      {/* Field of Study */}
      {fieldOfStudy && <p className="text-sm text-slate-500 mt-1">{fieldOfStudy}</p>}

      {/* Duration */}
      <p className="text-xs text-slate-500 mt-3">
        {formatDate(startDate)}{' '}
        {isCurrent ? '– Present' : endDate ? `– ${formatDate(endDate)}` : ''}
      </p>

      {/* Grade */}
      {grade && <p className="text-sm text-slate-600 mt-2 font-medium">{grade}</p>}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <ul className="mt-4 space-y-2">
          {achievements
            .filter((a) => a?.isActive)
            .map((achievement, index) => (
              <li key={index} className="text-sm text-slate-500 flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong className="text-slate-600">{achievement?.title}</strong>
                  {achievement?.description && ` — ${achievement?.description}`}
                </span>
              </li>
            ))}
        </ul>
      )}
    </motion.div>
  )
}

export default Education
