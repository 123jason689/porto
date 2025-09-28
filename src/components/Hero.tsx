import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Cpu, Globe } from 'lucide-react';
import VantaBackground from './VantaBackground';
import ppPixel from '../assets/images/pp_pixel.png';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <VantaBackground className="absolute inset-0 z-0" />

      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/30 to-transparent backdrop-blur-[1px] rounded-tr-[120px] rounded-br-[40px] rounded-tr-clip" />
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="absolute bottom-8 right-8 h-56 w-56 rounded-full bg-quantum/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-950/60 via-slate-950/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-[36vw] max-w-[720px] min-w-[260px] translate-y-[12%] sm:translate-y-[8%] md:translate-y-[4%]">
        <div className="relative">
          <img
            src={ppPixel}
            alt=""
            aria-hidden="true"
            className="relative z-10 w-full h-full object-contain select-none [image-rendering:pixelated] drop-shadow-[0_0_40px_rgba(123,44,191,0.35)] opacity-90"
            style={{ filter: 'saturate(1.06) contrast(1.05) brightness(1.04)' }}
          />
        </div>
      </div>
      
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-violet-600 to-blue-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-4 h-4 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-plasma mb-6 glitch"
            data-text="Jason Melvin Hartono"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-quantum via-plasma to-nebula bg-clip-text text-transparent">
              Jason Melvin
            </span>
            <br />
            <span className="text-plasma">Hartono</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-plasma mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Bridging realms of{' '}
            <span className="text-quantum font-semibold">embedded systems</span>,{' '}
            <span className="text-plasma font-semibold">AI/ML</span>, and{' '}
            <span className="text-nebula font-semibold">Web apps</span> to create disruptive technological experiences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-nebula hover:bg-quantum text-white font-medium rounded-full transition-all transform hover:scale-105"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-nebula hover:border-quantum text-plasma font-medium rounded-full transition-all transform hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-quantum" />
      </motion.div>
    </section>
  );
};

export default Hero;