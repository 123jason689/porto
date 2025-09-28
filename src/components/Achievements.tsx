import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';

const Achievements: React.FC = () => {
  const hackathons = [
    {
      place: '1st Place',
      title: 'CodeFest ICP Indonesia Hackathon 11',
      subtitle: 'Web3 x AI Hackathon',
      description: 'Implemented A Web3‑powered AI platform for short‑term property rentals on the Internet Computer.',
      date: 'Mar 2025',
      award: 'Grand Prize Winner'
    },
    {
      place: 'Finalist',
      title: 'Microsoft ElevAIte',
      subtitle: 'AI x IoT Innovation Challenge',
      description: 'Developed Moorgan-IoT, an embedded solution for sustainable agriculture monitoring that won top honors among 150+ teams.',
      date: 'June 2025',
      award: 'Grand Prize Winner'
    }
  ];

  return (
    <section id="hackathons" className="py-20 px-4 sm:px-6 lg:px-8 bg-cosmic bg-opacity-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-16 text-center text-plasma">
            <span className="text-quantum">/</span> Outstanding Achievements <span className="text-quantum">/</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.title}
              className="bg-darkmatter rounded-xl p-6 border border-nebula border-opacity-30"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start mb-4">
                <div className="hackathon-badge px-6 py-1 text-white font-bold mr-4">
                  {hackathon.place}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-quantum">{hackathon.title}</h3>
                  <p className="text-plasma">{hackathon.subtitle}</p>
                </div>
              </div>
              <p className="text-plasma mb-4">{hackathon.description}</p>
              <div className="flex items-center text-sm text-plasma">
                <Calendar className="mr-1 w-4 h-4" />
                <span className="mr-4">{hackathon.date}</span>
                <Award className="mr-1 w-4 h-4" />
                <span>{hackathon.award}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;