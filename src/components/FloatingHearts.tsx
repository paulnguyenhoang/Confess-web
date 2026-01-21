import { useEffect, useMemo, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { THEME } from "../utils/constants";

// Component tạo tim bay và sparkle background
export const FloatingHearts = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [heartCount, setHeartCount] = useState<number>(THEME.hearts.count.desktop);

  useEffect(() => {
    // Responsive: điều chỉnh số lượng tim theo màn hình
    const updateHeartCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setHeartCount(THEME.hearts.count.mobile);
      } else if (width < 1024) {
        setHeartCount(THEME.hearts.count.tablet);
      } else {
        setHeartCount(THEME.hearts.count.desktop);
      }
    };

    updateHeartCount();
    window.addEventListener("resize", updateHeartCount);
    return () => window.removeEventListener("resize", updateHeartCount);
  }, []);

  // Nếu reduce motion, giảm số lượng
  const count = reduceMotion ? Math.max(3, Math.floor(heartCount / 3)) : heartCount;

  // IMPORTANT: Không random trực tiếp trong render (tránh reset animation khi re-render)
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = 22 + Math.random() * 26; // ~22-48px
      const left = Math.random() * 100; // 0-100%
      const duration = 18 + Math.random() * 10; // 18-28s (chậm, đều)
      const delay = Math.random() * 8; // 0-8s
      const sway = 2.8 + Math.random() * 2.2; // 2.8-5s

      return { id: `heart-${i}`, size, left, duration, delay, sway };
    });
  }, [count]);

  const sparkles = useMemo(() => {
    const sparkleCount = Math.max(3, Math.floor(count / 2));
    return Array.from({ length: sparkleCount }).map((_, i) => {
      const size = 12 + Math.random() * 12; // 12-24px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 2.5 + Math.random() * 2.5; // 2.5-5s
      const delay = Math.random() * 3;

      return { id: `sparkle-${i}`, size, left, top, duration, delay };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart-float absolute"
          style={
            {
              // dùng CSS variables để animation ổn định + mượt
              ["--x" as any]: `${h.left}%`,
              ["--d" as any]: `${h.duration}s`,
              ["--delay" as any]: `${h.delay}s`,
              ["--sway" as any]: `${h.sway}s`,
            } as React.CSSProperties
          }
        >
          <div className="heart-inner">
            <Heart className="text-pink-400/35 fill-pink-400/25" size={h.size} />
          </div>
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <Sparkles className="text-yellow-300/40" size={s.size} />
        </div>
      ))}
    </div>
  );
};
