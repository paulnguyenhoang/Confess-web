import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { LoveCard } from "../components/LoveCard";
import { ActionButton } from "../components/ActionButton";
import { FloatingHearts } from "../components/FloatingHearts";
import { ToggleMusic } from "../components/ToggleMusic";
import { useTypewriter } from "../hooks/useTypewriter";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { CONTENT, STORAGE_KEYS, ChoiceType } from "../utils/constants";
import { storage } from "../utils/storage";
import { createMotionVariants } from "../utils/motion";

// Màn 1: Tỏ tình
export const ConfessPage = () => {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();
  const variants = createMotionVariants(reduceMotion);

  // Typewriter effect
  const typewriterText = useTypewriter({
    texts: CONTENT.confess.typewriterTexts,
    typingSpeed: 50,
    deletingSpeed: 30,
    pauseDuration: 2000,
    loop: true,
  });

  const [isExiting, setIsExiting] = useState(false);

  // Handle button click
  const handleChoice = (choice: ChoiceType) => {
    // Lưu lựa chọn vào localStorage
    storage.set(STORAGE_KEYS.CHOICE, choice);

    // Animation exit
    setIsExiting(true);
    setTimeout(() => {
      navigate("/yay");
    }, 400);
  };

  return (
    <>
      <FloatingHearts />
      <ToggleMusic />

      {/* Radial glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full bg-gradient-radial from-pink-300/30 via-purple-300/20 to-transparent blur-3xl" />
      </div>

      <motion.div
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        variants={variants.fadeIn}
        className="relative z-10"
      >
        <LoveCard className="flex flex-col items-center gap-4 sm:gap-5">
          {/* Icon decoration */}
          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-pink-500 fill-pink-500" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center leading-tight text-gray-800 text-balance">
            {CONTENT.confess.title}
          </h1>

          {/* Typewriter subtitle */}
          <div className="min-h-[60px] sm:min-h-[70px] confess-subtitle-spacing">
            <p className="text-base sm:text-lg lg:text-xl text-center text-gray-600 italic opacity-80">
              {typewriterText}
              <span className="typewriter-caret inline-block w-0.5 h-5 bg-pink-500 ml-1" />
            </p>
          </div>

          {/* Illustration placeholder - much closer to subtitle */}
          <svg
            viewBox="0 0 200 200"
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 -mt-2"
            fill="none"
          >
            {/* Simple couple illustration */}
            <circle cx="70" cy="80" r="30" fill="#f9a8d4" opacity="0.6" />
            <circle cx="130" cy="80" r="30" fill="#f9a8d4" opacity="0.6" />
            <path
              d="M 70 110 Q 100 140 130 110"
              stroke="#ec4899"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="65" cy="75" r="4" fill="#1f2937" />
            <circle cx="135" cy="75" r="4" fill="#1f2937" />
            <path
              d="M 60 65 Q 65 60 70 65"
              stroke="#1f2937"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 130 65 Q 135 60 140 65"
              stroke="#1f2937"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <ActionButton
              variant="primary"
              onClick={() => handleChoice("primary")}
              className="text-base sm:text-lg"
            >
              {CONTENT.confess.buttons.primary}
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => handleChoice("secondary")}
              className="text-base sm:text-lg"
            >
              {CONTENT.confess.buttons.secondary}
            </ActionButton>
          </div>
        </LoveCard>
      </motion.div>
    </>
  );
};
