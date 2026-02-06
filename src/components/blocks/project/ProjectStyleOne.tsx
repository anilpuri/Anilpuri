import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { detectColorType } from '@/lib/color/color-detector'
import ProjectLinkIcon from '@/components/ui/project-link-icon'
const ProjectStyleOne = ({ project, page, personalDetails }) => {
  console.log(project)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-16"
    >
      <div className="container-custom">
        {/* Back Button */}
        <Link href="/projects" className="">
          <Button
            variant="ghost"
            className="mb-8 text-slate-500 hover:text-primary pl-0 hover:bg-transparent cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Button>
        </Link>
        {/* Header */}
        <div className="max-w-4xl">
          {project?.title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              {project?.title}
            </h1>
          )}
          {project?.subtitle && (
            <p className="text-xl text-slate-500 leading-relaxed mb-4">{project.subtitle}</p>
          )}
          <ProjectLink links={project?.links} />
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 border border-slate-100 bg-slate-100">
          {/* Unsplash image: Large detailed view of the project interface */}
          <img
            src={project?.banner?.url}
            alt={project?.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-2 space-y-12">{/* bocks render */}</div>
          {/* Sidebar */}
          <div className="space-y-8"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectStyleOne

const baseButtonStyles =
  'transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2'

const ProjectLink = ({ links }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {links?.map((link, index) => {
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
