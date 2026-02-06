'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/ui/icon'
import clsx from 'clsx'

const proficiencyMap = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const Skills = ({ item, idx = 0 }) => {
  const { name, category, icon, enableIcon, Proficiency, description } = item

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      className="bg-slate-100 p-6 rounded-2xl border border-slate-100
                 hover:border-primary/20 hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {enableIcon && icon && <Icon icon={icon} />}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>

          {category?.title && <p className="text-xs text-slate-500">{category.title}</p>}
        </div>
      </div>

      {/* Description */}
      {description && <p className="text-sm text-slate-500 mt-3 leading-relaxed">{description}</p>}

      {/* Footer */}
      {(Proficiency || item.isFeatured) && (
        <div className="flex items-center gap-3 mt-4">
          {Proficiency && (
            <span
              className={clsx(
                'text-xs font-medium px-3 py-1 rounded-full',
                Proficiency === 'expert' && 'bg-emerald-100 text-emerald-700',
                Proficiency === 'advanced' && 'bg-indigo-100 text-indigo-700',
                Proficiency === 'intermediate' && 'bg-amber-100 text-amber-700',
                Proficiency === 'beginner' && 'bg-slate-200 text-slate-600',
              )}
            >
              {proficiencyMap[Proficiency]}
            </span>
          )}

          {item.isFeatured && <span className="text-xs font-semibold text-primary">Featured</span>}
        </div>
      )}
    </motion.div>
  )
}

export default Skills
