'use client'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
  slug?: string
}

export function SectionHeader({
  title,
  subtitle,
  className = '',
  centered = true,
  slug = '',
}: SectionHeaderProps) {
  return (
    <section id={slug} className="section-head-padding bg-white  scroll-mt-24">
      <div className="container-custom">
        <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3 relative inline-block">
              {title}
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
            </h2>
            {subtitle && (
              <p className="text-slate-500 mt-4 max-w-2xl text-lg font-light leading-relaxed mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
