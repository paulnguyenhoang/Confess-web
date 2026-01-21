import { motion } from "framer-motion";
import { DATE_OPTIONS } from "../utils/constants";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { staggerContainer, staggerItem } from "../utils/motion";

// Gallery các "polaroid" cards với date options
export const PolaroidGallery = () => {
  const reduceMotion = usePrefersReducedMotion();

  // Góc nghiêng random cho mỗi polaroid
  const rotations = ["-rotate-2", "rotate-2", "-rotate-1"];

  return (
    <motion.div
      className="grid grid-cols-1 landscape:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 my-6 sm:my-8"
      variants={staggerContainer(reduceMotion)}
      initial="initial"
      animate="animate"
    >
      {DATE_OPTIONS.map((option, index) => (
        <motion.div
          key={option.id}
          variants={staggerItem}
          className={`polaroid bg-white rounded-lg shadow-xl p-3 landscape:p-3 sm:p-4 lg:p-5 min-h-[120px] landscape:min-h-[100px] ${rotations[index]} 
                      hover:shadow-2xl transition-shadow`}
        >
          {/* Placeholder "ảnh" */}
          <div
            className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 
                          rounded-md mb-3 landscape:mb-2 sm:mb-4 flex items-center justify-center"
          >
            <span className="text-5xl landscape:text-6xl sm:text-7xl">{option.emoji}</span>
          </div>

          {/* Caption */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
              {option.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">{option.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
