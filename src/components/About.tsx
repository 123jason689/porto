import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Zap, Code2, Cpu, Wifi } from 'lucide-react';
import profpic from '../assets/images/profpic.jpg'

const About: React.FC = () => {
  const skills = [
    { icon: Brain, label: 'Artificial Intelligence', color: 'text-violet-400' },
    { icon: Wifi, label: 'Internet of Things', color: 'text-blue-400' },
    { icon: Layers, label: 'Machine Learning', color: 'text-indigo-400' },
    { icon: Code2, label: 'Full-Stack Development', color: 'text-slate-400' },
    { icon: Cpu, label: 'Embedded Systems', color: 'text-violet-400' },
    { icon: Zap, label: 'Innovation & Research', color: 'text-blue-400' }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">
            About <span className="text-violet-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
              src={profpic}
              alt="Student portrait"
              className="w-max h-max rounded-2xl object-cover mx-auto lg:mx-0 shadow-[192px_8px_32px_2px_rgba(109,40,217,0.40)]"
              loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="pointer-events-none absolute -inset-2 rounded-xl bg-gradient-to-br from-violet-600/10 via-indigo-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-700"></div>
              <div className="pointer-events-none absolute -top-8 -right-10 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl mix-blend-screen"></div>
              <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl mix-blend-screen"></div>
              <div className="prose prose-lg prose-invert max-w-none relative z-10">
                <p className="text-slate-300 leading-relaxed text-justify text-lg">
                  I’m <span className="font-semibold text-violet-300">Jason Melvin Hartono</span>, a <span className="text-violet-400 font-semibold">full‑stack</span> and <span className="text-indigo-300 font-semibold">applied‑AI engineer</span> who builds end‑to‑end systems connecting <span className="font-semibold text-cyan-300">embedded IoT & firmware</span>, <span className="font-semibold text-fuchsia-300">computer‑vision / ML services</span>, <span className="font-semibold text-blue-300">scalable backends</span>, and <span className="font-semibold text-emerald-300">intuitive frontends</span>. I turn prototypes into reliable products—integrating AI at the edge and cloud, designing resilient data & storage flows, and shipping user‑focused experiences that deliver measurable impact. I prioritize <span className="text-violet-300 font-semibold">robustness</span>, <span className="text-blue-300 font-semibold">extensibility</span>, and making complex technology feel <span className="text-fuchsia-300 font-semibold">simple</span> and <span className="text-emerald-300 font-semibold">useful</span>.
                </p>
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-violet-600/40 via-fuchsia-400/40 to-blue-500/40"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <skill.icon className={`w-5 h-5 ${skill.color}`} />
                  <span className="text-sm text-slate-300 font-medium">{skill.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;