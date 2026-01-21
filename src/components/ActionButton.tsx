import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { createMotionVariants } from "../utils/motion";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

// Button component tái sử dụng với variants
export const ActionButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
}: ActionButtonProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const variants = createMotionVariants(reduceMotion);

  const baseClasses =
    "px-8 py-4 h-14 sm:h-16 min-w-[180px] sm:min-w-[200px] rounded-full font-semibold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-400 btn-glow",
    secondary: "bg-white text-pink-600 hover:bg-pink-50 focus:ring-pink-400 shadow-lg",
    ghost: "bg-white/10 text-white hover:bg-white/20 focus:ring-white/50",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={variants.hover}
      whileTap={variants.tap}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};
