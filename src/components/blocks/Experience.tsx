import { SectionHeader } from '@/components/SectionHeader'
import { useExperience, useEducation, useAchievements } from '@/hooks/use-portfolio'
import { motion } from 'framer-motion'

import { GraduationCap, Award } from 'lucide-react'

// --- SECTIONS ---

function Experience() {
  const { data: experience, isLoading } = useExperience()

  return (
    <section id="experience" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey and the value I've delivered to companies."
        />

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-12">
            {experience?.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="mt-1 sm:mt-0 text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </div>
                </div>

                <ul className="list-disc pl-4 space-y-2 text-slate-600 mb-4 marker:text-primary">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                {exp.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
