import React, { useEffect, useRef } from 'react';

interface VantaBackgroundProps {
  className?: string;
}

interface VantaEffect {
  destroy(): void;
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({ className = "fixed inset-0 -z-10" }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const loadVanta = async () => {
      try {
        const THREE = await import('three');
        (window as typeof window & { THREE: typeof THREE }).THREE = THREE;
        
        const mod = await import('vanta/dist/vanta.globe.min.js') as any;
        const globeFactory = (mod.default && mod.default.GLOBE) ? mod.default.GLOBE : (mod.GLOBE || mod.globe || mod.default);
        if (!globeFactory) {
          throw new Error('Vanta Globe factory not found in module');
        }
        if (vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = globeFactory({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xffe13f,
            backgroundColor: 0xa1835,
            size: 2.0
          });
        }
      } catch (error) {
        console.warn('Vanta.js failed to load:', error);
        if (vantaRef.current) {
          vantaRef.current.style.background = 'linear-gradient(145deg, #1a1423 0%, #2a0c4e 100%)';
        }
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className={className}
      style={{
        background: 'linear-gradient(145deg, #1a1423 0%, #2a0c4e 100%)',
      }}
    />
  );
};

export default VantaBackground;