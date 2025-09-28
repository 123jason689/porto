import React from 'react';
import { motion } from 'framer-motion';
import { Home, Radar } from 'lucide-react';
import ThreeJSScene from '../components/ThreeJSScene';
import VantaBackground from '../components/VantaBackground';

const NotFound: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-darkmatter text-plasma font-mono" aria-labelledby="notfound-title">
      <VantaBackground className="absolute inset-0 z-0 opacity-[0.55]" />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-quantum/15 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[520px] w-[520px] rounded-full bg-nebula/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-plasma/15 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_2px)] opacity-30" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,212,0.08),transparent_70%)]" />

      <section className="relative z-20 mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 px-6 py-28 text-center md:py-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative"
        >
          <h1
            id="notfound-title"
            className="relative text-[18vw] leading-none font-bold tracking-tighter select-none glitch bg-gradient-to-r from-quantum via-plasma to-nebula bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,245,212,0.4)] md:text-[12rem]"
            data-text="404"
          >
            404
          </h1>
          <span className="pointer-events-none absolute -bottom-6 right-2 text-[10px] uppercase tracking-[0.55em] text-quantum/70">
            anomaly
          </span>
          <div className="pointer-events-none absolute inset-0 -z-10 animate-pulseSlow rounded-full border-2 border-quantum/20" />
          <div className="pointer-events-none absolute inset-0 -z-10 animate-spin-slow rounded-full border border-plasma/10 [mask:radial-gradient(circle,transparent_52%,black_54%)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl text-base md:text-lg leading-relaxed text-plasma/85"
        >
          The quantum address you attempted to resolve has decohered. The resource drifted beyond our observable
          interface layer. You can recalibrate your trajectory below or return to the command nexus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-quantum/10 via-plasma/5 to-nebula/10 blur-2xl" />
          <div className="rounded-2xl border border-quantum/30 bg-black/40 p-4 backdrop-blur-md shadow-[0_0_40px_rgba(0,245,212,0.25)]">
            <ThreeJSScene
              containerId="notfound-geo"
              geometryType="icosahedron"
              modelScale={5}
              targetSize={6}
              lightingPreset="dramatic"
              color={0x00f5d4}
              className="threejs-container h-60 rounded-xl border border-quantum/20" />
            <div className="mt-4 text-center text-xs uppercase tracking-[0.45em] text-quantum/70 flex items-center justify-center gap-2">
              <Radar className="h-4 w-4" /> scanning void...
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/porto/"
            className="group inline-flex items-center gap-2 rounded-full bg-quantum px-8 py-3 text-sm font-semibold tracking-wide text-darkmatter shadow-[0_0_25px_rgba(0,245,212,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,245,212,0.7)]"
          >
            <Home className="h-4 w-4" /> Return Home
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 text-[10px] tracking-[0.5em] uppercase text-quantum/60"
        >
          error code: QNTM-404 • lost in superposition
        </motion.div>
      </section>
    </main>
  );
};

export default NotFound;