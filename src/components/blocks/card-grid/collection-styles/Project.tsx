'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { detectColorType } from '@/lib/color/color-detector'
import ProjectLinkIcon from '@/components/ui/project-link-icon'
const Project = ({ item, idx }) => {
  console.log('Rendering project:', item)
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="aspect-video bg-slate-200 overflow-hidden relative">
        <img
          src={item?.banner?.url || 'https://picsum.photos/300/200'}
          alt={item?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {item.links?.map((link, index) => {
            const iconStyle = link?.icon?.style?.enabled ? link?.icon?.style : false
            const bgColor = detectColorType(iconStyle?.['bg-color'] ?? 'white')?.css
            const bgShapeClass =
              iconStyle?.shape === 'circle'
                ? 'rounded-full'
                : iconStyle?.shape === 'square'
                  ? 'rounded-none'
                  : iconStyle?.shape === 'rounded'
                    ? 'rounded'
                    : 'rounded'
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 ${bgShapeClass} hover:opacity-70  transition-colors`}
                title={link?.label}
                style={{ backgroundColor: bgColor }}
              >
                <ProjectLinkIcon icon={link.icon} />
              </a>
            )
          })}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-500 mb-2 group-hover:!text-primary transition-colors">
          {item?.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4  line-clamp-3 flex-grow">{item?.overview}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {(item.technologies || []).slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 "
            >
              {tech?.name}
            </span>
          ))}
          {(item.technologies?.length || 0) > 3 && (
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>

        <Link href={`/projects/${item?.id}`}>
          <Button
            variant="outline"
            className="w-full cursor-pointer group-hover:border-primary group-hover:text-primary transition-colors"
          >
            View More <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export default Project
