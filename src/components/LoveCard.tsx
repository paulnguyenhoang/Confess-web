import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { createMotionVariants } from "../utils/motion";

interface LoveCardProps {
  children: ReactNode;
  className?: string;
}

// Card chính với glassmorphism effect
export const LoveCard = ({ children, className = "" }: LoveCardProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const variants = createMotionVariants(reduceMotion);

  return (
    <motion.div
      className={`glass-card p-4 landscape:p-3 sm:p-6 lg:p-8 w-[min(98vw,520px)] landscape:w-[98vw] sm:w-[min(86vw,600px)] lg:w-[min(760px,70vw)] mx-auto ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.scaleIn}
    >
      {children}
    </motion.div>
  );
};
