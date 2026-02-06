import { SectionHeader } from './SectionHeader'
import { motion } from 'framer-motion'
import { Award, User, Code, Globe } from 'lucide-react'

function About() {
  const cards = [
    {
      title: 'Full Stack Developer',
      desc: 'Specializing in React, Node.js, and modern web architectures.',
      icon: Code,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Problem Solver',
      desc: 'Passionate about solving complex technical challenges with elegant solutions.',
      icon: Globe,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Tech Enthusiast',
      desc: 'Always exploring new technologies and staying up-to-date with industry trends.',
      icon: Award,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <main className="pt-24 pb-20">
      <div className="container-custom">
        <SectionHeader
          title="About Me"
          subtitle="Get to know more about my background, passion, and what drives me as a developer."
          centered
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <User className="text-primary" /> My Story
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                I'm a dedicated Full Stack Developer with a strong foundation in building scalable
                and performant web applications. My journey in tech started with a curiosity for how
                things work on the web, which evolved into a professional career focused on
                delivering high-quality digital experiences.
              </p>
              <p>
                With expertise in both frontend and backend technologies, I enjoy bridging the gap
                between design and technical implementation. I believe in writing clean,
                maintainable code and always put the user experience at the forefront of my work.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new libraries, contributing to
                open-source projects, or sharing my knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop"
                alt="Anil Puri Goswami Professional"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-2xl font-bold">5+</p>
              <p className="text-sm opacity-90">Years Experience</p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all group"
            >
              <div
                className={`p-4 rounded-2xl inline-block mb-6 ${card.color} group-hover:scale-110 transition-transform`}
              >
                <card.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
              <p className="text-slate-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
export default About
