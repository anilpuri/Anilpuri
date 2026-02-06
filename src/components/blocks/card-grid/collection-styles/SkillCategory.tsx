'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { findPaginated } from '@/lib/payload.client'
import SkillSmall from './SkillSmall'

const SkillCategory = ({ item, idx }) => {
  const [skillList, setSkillList] = useState([])
  const fetchSkills = async (categoryId) => {
    const result = await findPaginated('skills', {
      page: 1,
      pageSize: 20,
      depth: 1,
      sort: 'id',
      where: {
        category: { equals: categoryId },
      },
    })
    setSkillList(result?.docs ?? [])
  }
  useEffect(() => {
    if (item?.id) {
      fetchSkills(item?.id)
    }
  }, [])

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-slate-100 rounded-2xl p-6 border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
        {item?.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skillList.map((skillItem, index) => (
          <SkillSmall item={skillItem} idx={index} key={index} />
        ))}
      </div>
    </motion.div>
  )
}

export default SkillCategory
