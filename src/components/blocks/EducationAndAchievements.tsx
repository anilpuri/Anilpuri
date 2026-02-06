import { useEducation, useAchievements } from '@/hooks/use-portfolio'

import { GraduationCap, Award } from 'lucide-react'
// --- SECTIONS ---

export default function EducationAndAchievements() {
  const { data: education } = useEducation()
  const { data: achievements } = useAchievements()

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-8 flex items-center gap-2">
              <GraduationCap className="text-primary" /> Education
            </h3>
            <div className="space-y-6">
              {education?.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 text-lg">{edu.degree}</h4>
                    <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-primary font-medium mb-1">{edu.institute}</p>
                  <p className="text-slate-500 text-sm">{edu.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Award className="text-primary" /> Achievements
            </h3>
            <div className="space-y-6">
              {achievements?.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
                >
                  <h4 className="font-bold text-slate-900 text-lg mb-2">{ach.title}</h4>
                  {ach.metric && (
                    <div className="text-2xl font-bold text-primary mb-2">{ach.metric}</div>
                  )}
                  <p className="text-slate-600 text-sm">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
