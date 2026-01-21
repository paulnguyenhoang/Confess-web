import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Gift, X } from "lucide-react";
import confetti from "canvas-confetti";
import { LoveCard } from "../components/LoveCard";
import { ActionButton } from "../components/ActionButton";
import { PolaroidGallery } from "../components/PolaroidGallery";
import { FloatingHearts } from "../components/FloatingHearts";
import { ToggleMusic } from "../components/ToggleMusic";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { CONTENT, DATE_OPTIONS, STORAGE_KEYS, ChoiceType } from "../utils/constants";
import { storage } from "../utils/storage";
import { createMotionVariants } from "../utils/motion";

// Màn 2: Celebration
export const CelebrationPage = () => {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();
  const variants = createMotionVariants(reduceMotion);

  const [choice] = useState<ChoiceType>(storage.get(STORAGE_KEYS.CHOICE, "primary"));
  const [showModal, setShowModal] = useState<"date" | "gift" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Confetti effect khi vào màn
  useEffect(() => {
    if (reduceMotion) return;

    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ec4899", "#f472b6", "#fbcfe8"],
        shapes: ["circle"],
        scalar: 1.2,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ec4899", "#f472b6", "#fbcfe8"],
        shapes: ["circle"],
        scalar: 1.2,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [reduceMotion]);

  const subtitle =
    choice === "primary"
      ? CONTENT.celebration.subtitle.primary
      : CONTENT.celebration.subtitle.secondary;

  return (
    <>
      <FloatingHearts />
      <ToggleMusic />

      {/* Back button - fixed position */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-4 sm:top-6 left-4 z-50 glass-card p-2 rounded-full hover:bg-white/20 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
        whileHover={reduceMotion ? {} : { scale: 1.05 }}
        whileTap={reduceMotion ? {} : { scale: 0.95 }}
        aria-label={CONTENT.celebration.buttons.back}
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </motion.button>

      {/* Radial glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full bg-gradient-radial from-pink-300/30 via-purple-300/20 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <LoveCard className="flex flex-col items-center gap-4 landscape:gap-3 sm:gap-5 lg:gap-6">
          {/* Title */}
          <motion.h1
            className="text-2xl landscape:text-xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight text-gray-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            {CONTENT.celebration.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base landscape:text-sm sm:text-lg lg:text-xl text-center text-gray-600 opacity-80"
            variants={variants.fadeIn}
          >
            {subtitle}
          </motion.p>

          {/* Polaroid gallery */}
          <PolaroidGallery />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <ActionButton
              variant="primary"
              onClick={() => setShowModal("date")}
              className="flex items-center justify-center gap-2 w-full sm:w-[240px]"
            >
              <Calendar className="w-5 h-5" />
              {CONTENT.celebration.buttons.primary}
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => setShowModal("gift")}
              className="flex items-center justify-center gap-2 w-full sm:w-[240px]"
            >
              <Gift className="w-5 h-5" />
              {CONTENT.celebration.buttons.secondary}
            </ActionButton>
          </div>
        </LoveCard>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal
            type={showModal}
            onClose={() => setShowModal(null)}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Modal component
interface ModalProps {
  type: "date" | "gift";
  onClose: () => void;
  selectedDate: string | null;
  onSelectDate: (id: string) => void;
  reduceMotion: boolean;
}

const Modal = ({ type, onClose, selectedDate, onSelectDate, reduceMotion }: ModalProps) => {
  const variants = createMotionVariants(reduceMotion);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-gradient-to-br from-pink-200/60 via-purple-200/50 to-violet-200/60 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-card p-5 sm:p-6 w-[min(92vw,520px)] sm:w-[520px] lg:w-[560px] bg-white/95 backdrop-blur-xl
                   rounded-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto"
        initial={{ y: reduceMotion ? 0 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduceMotion ? 0 : 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
          aria-label="Đóng"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {type === "gift" ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{CONTENT.modal.gift.title}</h2>
            <p className="text-xl text-pink-600 font-medium mb-2">{CONTENT.modal.gift.content}</p>
            <p className="text-gray-600">{CONTENT.modal.gift.description}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {CONTENT.modal.date.title}
            </h2>
            <p className="text-gray-600 text-center mb-6">{CONTENT.modal.date.description}</p>

            <div className="space-y-3">
              {DATE_OPTIONS.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => onSelectDate(option.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all
                             ${
                               selectedDate === option.id
                                 ? "bg-pink-100 border-2 border-pink-500"
                                 : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                             }`}
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{option.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-pink-50 rounded-xl text-center"
              >
                <p className="text-pink-700 font-medium">
                  Okk nhé người. Hẹn nàng ngày 6/2/2026 nhé 💕
                </p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
