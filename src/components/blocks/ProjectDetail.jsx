  import { useProject } from '@/hooks/use-portfolio'

  import { Button } from '@/components/ui/button'
  import { Link, useRoute } from 'wouter'
  import { ArrowLeft, ExternalLink, Github, User, Code } from 'lucide-react'
  import { motion } from 'framer-motion'

  export default function ProjectDetail() {
    const [, params] = useRoute('/projects/:slug')
    const slug = params?.slug || ''
    const { data: project, isLoading, error } = useProject(slug)

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      )
    }

    if (error || !project) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Not Found</h2>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-28 pb-16"
      >
        <div className="container-custom">
          {/* Back Button */}
          <Link href="/#projects">
            <Button
              variant="ghost"
              className="mb-8 text-slate-500 hover:text-primary pl-0 hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </Button>
          </Link>

          {/* Header */}
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-8">{project.shortDescription}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              {project.liveUrl && (
                <Button className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" className="rounded-full h-12 px-8 border-slate-300" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4 mr-2" /> View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 border border-slate-100 bg-slate-100">
            {/* Unsplash image: Large detailed view of the project interface */}
            <img
              src={
                project.images[0] ||
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop'
              }
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Overview</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p className="whitespace-pre-line">{project.fullDescription}</p>
                </div>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {project.problem && (
                  <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <h3 className="text-lg font-bold text-red-700 mb-3">The Problem</h3>
                    <p className="text-slate-700">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="text-lg font-bold text-green-700 mb-3">The Solution</h3>
                    <p className="text-slate-700">{project.solution}</p>
                  </div>
                )}
              </div>

              {/* Video if exists */}
              {project.videoUrl && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Demo Video</h2>
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-900">
                    <iframe
                      src={project.videoUrl}
                      className="w-full h-full"
                      title="Project Demo"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role */}
              {project.role && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" /> My Role
                  </h3>
                  <p className="text-slate-600">{project.role}</p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Like what you see?</h3>
                <p className="text-slate-500 mb-4 text-sm">
                  I'm currently available for new opportunities.
                </p>
                <Link href="/#contact">
                  <Button className="w-full bg-primary hover:bg-primary/90">Contact Me</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
