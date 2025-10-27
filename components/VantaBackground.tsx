'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Check if we're on mobile (disable for performance)
    if (typeof window === 'undefined' || window.innerWidth < 768) {
      console.log('[Vanta] Disabled on mobile');
      return;
    }

    let threeScriptElement: HTMLScriptElement | null = null;
    let vantaScriptElement: HTMLScriptElement | null = null;

    // Load THREE.js and Vanta via script tags from local files
    const loadScripts = () => {
      console.log('[Vanta] Loading scripts from local files...');

      // Check if THREE script already exists
      const existingThreeScript = document.querySelector('script[src*="three"]');
      if (existingThreeScript && window.THREE) {
        console.log('[Vanta] THREE.js already loaded');
        loadVantaScript();
        return;
      }

      // Load THREE.js from local file
      threeScriptElement = document.createElement('script');
      threeScriptElement.src = '/vendor/three.min.js';

      threeScriptElement.onload = () => {
        console.log('[Vanta] THREE.js loaded successfully from local file', window.THREE);
        loadVantaScript();
      };

      threeScriptElement.onerror = () => {
        console.error('[Vanta] Failed to load THREE.js from local file');
      };

      document.head.appendChild(threeScriptElement);
    };

    const loadVantaScript = () => {
      // Check if Vanta script already exists
      const existingVantaScript = document.querySelector('script[src*="vanta"]');
      if (existingVantaScript && window.VANTA) {
        console.log('[Vanta] Vanta already loaded');
        initializeVanta();
        return;
      }

      // Load Vanta DOTS from local file
      vantaScriptElement = document.createElement('script');
      vantaScriptElement.src = '/vendor/vanta.dots.min.js';

      vantaScriptElement.onload = () => {
        console.log('[Vanta] Vanta.js loaded successfully from local file', window.VANTA);
        initializeVanta();
      };

      vantaScriptElement.onerror = () => {
        console.error('[Vanta] Failed to load Vanta.js from local file');
      };

      document.head.appendChild(vantaScriptElement);
    };

    const initializeVanta = () => {
      if (!vantaRef.current) {
        console.error('[Vanta] Ref not available');
        return;
      }

      if (vantaEffect.current) {
        console.log('[Vanta] Already initialized');
        return;
      }

      if (!window.VANTA || !window.THREE) {
        console.error('[Vanta] VANTA or THREE not available', { VANTA: window.VANTA, THREE: window.THREE });
        return;
      }

      try {
        console.log('[Vanta] Initializing effect...');
        vantaEffect.current = window.VANTA.DOTS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          // Pure black background throughout
          backgroundColor: 0x000000,
          color: 0x8b5cf6, // bright purple
          color2: 0xa78bfa, // lighter purple
          // Subtle, professional settings
          size: 4.0,
          spacing: 15.0,
          showLines: true,
        });
        console.log('[Vanta] Effect initialized successfully', vantaEffect.current);
      } catch (error) {
        console.error('[Vanta] Error initializing effect:', error);
      }
    };

    // Check if scripts are already loaded
    if (window.VANTA && window.THREE) {
      console.log('[Vanta] Scripts already loaded, initializing immediately');
      initializeVanta();
    } else {
      loadScripts();
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffect.current) {
        console.log('[Vanta] Destroying effect');
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
      }}
      aria-hidden="true"
    />
  );
}
