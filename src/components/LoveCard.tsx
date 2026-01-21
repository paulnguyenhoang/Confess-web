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
      className={`glass-card p-6 sm:p-8 w-[min(92vw,520px)] sm:w-[min(86vw,600px)] lg:w-[min(760px,70vw)] mx-auto ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.scaleIn}
    >
      {children}
    </motion.div>
  );
};
