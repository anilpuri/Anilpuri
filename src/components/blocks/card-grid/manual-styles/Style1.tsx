'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { DynamicIcon } from 'lucide-react/dynamic'
import Icon from '@/components/ui/icon'

const Style1 = ({ icon, title, subtitle, description, idx }) => {
  const color = 'bg-blue-100'
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-slate-100 p-8 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all group"
    >
      {/* Icon */}
      {icon && <Icon icon={icon} />}

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>

      {/* Subtitle (optional) */}
      {subtitle && <h4 className="text-sm font-medium text-slate-600 mb-2">{subtitle}</h4>}

      {/* Description */}
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default Style1
