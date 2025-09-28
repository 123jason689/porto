import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Interactive from '../components/Interactive';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen text-plasma font-sans overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Interactive />
        <Contact />
      </main>
    </div>
  );
};

export default Home;