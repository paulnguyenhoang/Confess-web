import { useState, useEffect } from "react";

// Hook typewriter effect
// Hiển thị text từng ký tự một, có caret nhấp nháy

interface UseTypewriterOptions {
  texts: readonly string[] | string[];
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character
  pauseDuration?: number; // ms pause after complete
  loop?: boolean;
}

export const useTypewriter = ({
  texts,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  loop = true,
}: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    // Đang pause sau khi gõ xong
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Đang gõ
    if (!isDeleting && displayText !== currentText) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    // Gõ xong -> pause
    if (!isDeleting && displayText === currentText) {
      if (!loop && currentIndex === texts.length - 1) {
        // Nếu không loop và đã hết text, dừng lại
        return;
      }
      setIsPaused(true);
      return;
    }

    // Đang xóa
    if (isDeleting && displayText !== "") {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    // Xóa xong -> chuyển câu tiếp theo
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev: number) => (prev + 1) % texts.length);
    }
  }, [
    displayText,
    currentIndex,
    isDeleting,
    isPaused,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ]);

  return displayText;
};
