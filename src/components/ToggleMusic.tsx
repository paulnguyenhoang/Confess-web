import { useState, useEffect } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "../utils/sound";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// Button toggle nhạc nền (góc phải trên)
export const ToggleMusic = () => {
  const [isPlaying, setIsPlaying] = useState(soundManager.getIsPlaying());
  const [showOverlay, setShowOverlay] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Thử autoplay khi component mount
    const attemptAutoplay = async () => {
      const success = await soundManager.tryAutoplay();
      if (!success && soundManager.getIsBlocked()) {
        // Nếu bị block, hiển thị overlay
        setShowOverlay(true);
      }
      setIsPlaying(soundManager.getIsPlaying());
    };

    attemptAutoplay();
  }, []);

  const handleToggle = async () => {
    const newState = await soundManager.toggle();
    setIsPlaying(newState);
  };

  const handleOverlayClick = async () => {
    await soundManager.play();
    setIsPlaying(true);
    setShowOverlay(false);
  };

  return (
    <>
      {/* Overlay khi autoplay bị chặn */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex items-center justify-center"
            onClick={handleOverlayClick}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 rounded-2xl text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handleOverlayClick}
            >
              <Music className="w-12 h-12 text-pink-500 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-800">Chạm để bật nhạc 🎵</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        className="fixed top-4 sm:top-6 right-4 z-50 glass-card p-3 rounded-full 
                   hover:bg-white/20 transition-colors focus:outline-none 
                   focus:ring-2 focus:ring-pink-400"
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        whileHover={reduceMotion ? {} : { scale: 1.1 }}
        whileTap={reduceMotion ? {} : { scale: 0.95 }}
      >
        {isPlaying ? (
          <Music className="w-5 h-5 text-pink-600" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
      </motion.button>
    </>
  );
};
