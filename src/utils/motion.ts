import { Variants } from "framer-motion";

// Animation variants cho framer-motion
// Hỗ trợ prefers-reduced-motion

export const createMotionVariants = (reduceMotion: boolean) => {
  // Nếu user bật reduce motion, giảm animation
  const duration = reduceMotion ? 0.01 : 0.3;
  const scale = reduceMotion ? 1 : 0.95;

  return {
    // Fade in từ opacity 0 -> 1
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration },
    } as Variants,

    // Scale + fade
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration },
    } as Variants,

    // Slide from bottom
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: { duration },
    } as Variants,

    // Button tap animation
    tap: {
      scale: reduceMotion ? 1 : scale,
      transition: { duration: 0.15 },
    },

    // Hover animation
    hover: {
      scale: reduceMotion ? 1 : 1.03,
      transition: { duration: 0.2 },
    },
  };
};

// Stagger children animation
export const staggerContainer = (reduceMotion: boolean): Variants => ({
  animate: {
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.1,
    },
  },
});

// Individual stagger item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
