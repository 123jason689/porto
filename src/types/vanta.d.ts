declare module 'vanta/dist/vanta.globe.min.js' {
  interface VantaGlobeOptions {
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    size?: number;
  }

  interface VantaEffect {
    destroy(): void;
  }

  interface VantaGlobe {
    GLOBE(options: VantaGlobeOptions): VantaEffect;
  }

  const VANTA: { default: VantaGlobe };
  export = VANTA;
}

declare global {
  interface Window {
    THREE: typeof import('three');
  }
}