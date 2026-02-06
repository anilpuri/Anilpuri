import React from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'

const Experience = ({ item, idx, total }) => {
  const { role, company, startDate, endDate, isCurrent, experiencePoints, technologies } = item

  const period = `${moment(startDate).format('MMM YYYY')} - ${
    isCurrent ? 'Present' : endDate ? moment(endDate).format('MMM YYYY') : ''
  }`

  const activePoints = experiencePoints?.filter((p) => p.isActive) || []

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative pl-14 mb-12"
    >
      {/* Vertical timeline line: stretch from dot center to next dot */}
      {idx !== total - 1 && (
        <span
          className="absolute left-7 top-2 w-[2px] bg-blue-200 border-l-2 border-dotted border-blue-300"
          style={{
            height: 'calc(100% + 5rem)', // extend below container to connect next dot
            zIndex: 0,
          }}
        />
      )}

      {/* Dot aligned perfectly with the line */}
      <div className="absolute left-5 top-2 w-5 h-5 rounded-full border-4  border-blue-600 bg-white shadow-md z-10" />

      {/* Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative z-20">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{role}</h3>
          <p className="text-blue-600 font-medium">{company}</p>
        </div>
        <div className="mt-1 sm:mt-0 text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
          {period}
        </div>
      </div>

      <ul className="list-disc pl-4 space-y-2 text-slate-600 mb-4 marker:text-blue-600 relative z-20">
        {activePoints.map((point, i) => (
          <li key={i}>
            <strong>{point.title}</strong>
            {point.description && `: ${point.description}`}
          </li>
        ))}
      </ul>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 relative z-20">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded-md"
            >
              {tech?.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Experience
