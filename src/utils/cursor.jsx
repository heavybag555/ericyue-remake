"use client";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCursorStore } from "@/store/zustand";
import { useMedia } from "react-use";

export const Cursor = () => {
  const { cursorVariant } = useCursorStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isTabletOrMobile = useMedia("(max-width: 992px)", false);

  useEffect(() => {
    const manageMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [mouseX, mouseY]);

  // Hide custom cursor on tablet/mobile
  if (isTabletOrMobile) {
    return null;
  }

  const showLabel = cursorVariant === "projectHero";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 mix-blend-exclusion pointer-events-none z-[500]"
        style={{ x: mouseX, y: mouseY }}
      >
        <div className="size-full">
          <AnimatePresence>
            {showLabel && (
              <motion.div
                key="cursor-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  exit: { duration: 0.4, delay: 0.15 },
                }}
                className="normal-txt"
              >
                View
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};
