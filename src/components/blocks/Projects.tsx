import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/hooks/use-portfolio'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'

function Projects() {
  const { data: projects, isLoading } = useProjects()

  return (
    <section id="projects" className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of projects that showcase my passion for building robust and user-friendly applications."
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video bg-slate-200 overflow-hidden relative">
                  {/* Unsplash image: Technology project dashboard or interface */}
                  <img
                    src={
                      project.images[0] ||
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors"
                        title="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
