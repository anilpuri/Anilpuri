import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import ProjectLinkIcon from '@/components/ui/project-link-icon'

const ProjectStyleTwo = ({ project, page, personalDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-16"
    >
      <div className="container-custom">
        {/* Back Button - Kept outside for navigation clarity */}
        <Link href="/projects">
          <Button
            variant="ghost"
            className="mb-8 text-slate-500 hover:text-primary pl-0 hover:bg-transparent cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Button>
        </Link>

        {/* Split Layout Card */}
        <div className="grid lg:grid-cols-2 w-full min-h-[600px] mb-16 shadow-sm border border-slate-100 rounded-none overflow-hidden">
          {/* Left Column: Image */}
          <div className="relative w-full h-[400px] lg:h-auto bg-slate-200">
            <img
              src={project?.banner?.url}
              alt={project?.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-start p-8 lg:p-16 xl:p-20 bg-[#E8F5F3] lg:min-h-[600px]">
            {/* Meta / Decorative Tag */}
            <div className="flex items-center justify-between text-xs font-semibold tracking-widest text-slate-500 uppercase mb-8">
              {/* <span>{project?.category || 'Case Study'}</span>
              <span>7 Mins</span> */}
            </div>

            {/* Title */}
            {project?.title && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                {project?.title}
              </h1>
            )}

            {/* Subtitle / Description */}
            {project?.subtitle && (
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
                {project.subtitle}
              </p>
            )}

            {/* Links / CTA */}
            <div className=" pt-4">
              <ProjectLink links={project?.links} />
            </div>
          </div>
        </div>

        {/* Remaining Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-2 space-y-12">{/* blocks render */}</div>
          {/* Sidebar */}
          <div className="space-y-8"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectStyleTwo

/* --- Helper Components & Styles (Kept identical) --- */

const baseButtonStyles =
  'transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2'

const ProjectLink = ({ links }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {links?.map((link, index) => {
        // Adjusting variants to fit the cleaner layout if needed,
        // essentially keeping the "Read Article" text style link in mind
        // but keeping original button logic for functionality.
        const variant = linkVariants[index % linkVariants.length]

        return (
          <Button
            key={index}
            asChild
            className={`rounded-full h-12 px-8 ${baseButtonStyles} ${variant.className}`}
          >
            <a href={link?.url} target="_blank" rel="noreferrer">
              <ProjectLinkIcon icon={link?.icon} defaultColor={variant.iconColor} />
              <span className="ml-2 font-medium">{link?.label}</span>
            </a>
          </Button>
        )
      })}
    </div>
  )
}

const linkVariants = [
  {
    // Primary CTA
    className: 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md',
    iconColor: 'white',
  },
  {
    // Dark neutral
    className: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md',
    iconColor: 'white',
  },
  {
    // Muted dark
    className: 'bg-slate-700 text-white hover:bg-slate-600 shadow-sm hover:shadow-md',
    iconColor: 'white',
  },
  {
    // Clean outline
    className:
      'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-slate-400',
    iconColor: 'black',
  },
  {
    // Soft accent
    className: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
    iconColor: 'primary',
  },
]
