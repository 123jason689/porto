import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Code, BrainCircuit } from 'lucide-react';

const Interactive: React.FC = () => {
  const skills = [
    {
      icon: Cpu,
      title: 'Embedded',
      description: 'C/C++, ESP32, Arduino, IoT'
    },
    {
      icon: Eye, 
      title: 'Artificial Intelligence',
      description: 'CV, PyTorch, Tensorflow, LLM, LangGraph'
    },
    {
      icon: BrainCircuit,
      title: 'Machine Learning',
      description: 'Motoko, ICP, Smart Contracts'
    },
    {
      icon: Code,
      title: 'Full-Stack',
      description: 'React, TS, Laravel, Flask, SQL, No-SQL'
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkmatter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-16 text-center text-plasma">
            <span className="text-quantum">/</span> Main Skills <span className="text-quantum">/</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="text-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-nebula bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <skill.icon className="text-quantum w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-plasma">{skill.title}</h3>
              <p className="text-plasma text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interactive;