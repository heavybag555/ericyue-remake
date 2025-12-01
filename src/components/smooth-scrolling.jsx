"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScrolling = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Lower values = smoother, higher values = more responsive
      duration: 1.5, // Duration of the scroll animation
      smoothWheel: true,
      smoothTouch: false, // Usually keep false for mobile to retain native feel, or true for unified feel
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScrolling;

