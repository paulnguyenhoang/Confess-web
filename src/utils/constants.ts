// ===== TEXT CONTENT =====
// Chỉnh sửa nội dung ở đây để thay đổi text hiển thị

export const CONTENT = {
  // Màn 1: Tỏ tình
  confess: {
    title: "Làm bạn gái anh nha? 💗",
    typewriterTexts: [
      "Cảm ơn em đã xuất hiện, để những ngày bình thường của anh trở nên đặc biệt hơn.",
      "Hy vọng từ nay, niềm vui của em sẽ luôn có sự hiện diện của anh.",
      "Mọi hành trình phía trước, mình cùng nhau bước tiếp nhé?",
    ],
    buttons: {
      primary: "Em đồng ý 💖",
      secondary: "Okk anh 🦩",
    },
  },

  // Màn 2: Celebration
  celebration: {
    title: "Yayyy! Từ giờ em là người thương của anh 💞",
    subtitle: {
      primary: "Anh sẽ yêu thương và chăm sóc em thật tốt nha 🥰",
      secondary: "Okk là okkk luôn nha 😚",
    },
    buttons: {
      primary: "Chọn lịch hẹn đầu tiên 📅",
      secondary: "Nhận quà nè 🎁",
      back: "Quay lại",
    },
  },

  // Modal content
  modal: {
    gift: {
      title: "Quà của em đây 🎁",
      content: "1 cái nắm tay + 1 ly matche latta yêu thích 🍵💚 ",
      description: "Anh sẽ đem đến tận tay em nha!",
    },
    date: {
      title: "Chọn lịch hẹn đầu tiên nào 💕",
      description: "Em muốn đi đâu với anh?",
    },
  },
} as const;

// ===== DATE OPTIONS =====
// Danh sách các lựa chọn hẹn hò
export const DATE_OPTIONS = [
  {
    id: "food",
    emoji: "🍜",
    title: "Đi ăn cùng nhau",
    description: "Ăn sập Sài Gòn hehe😋",
  },
  {
    id: "movie",
    emoji: "📷",
    title: "Đi chụp photobooth",
    description: "Chụp ảnh đôi VT 🧏‍♂️🧏‍♀️",
  },
  {
    id: "walk",
    emoji: "🌙",
    title: "Đi dạo tối",
    description: "Dạo phố cùng người đẹp 💕",
  },
] as const;

// ===== THEME CONFIG =====
// Cấu hình màu sắc và animation
export const THEME = {
  colors: {
    primary: "#ec4899", // pink-500
    secondary: "#db2777", // pink-600
    accent: "#f472b6", // pink-400
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 600,
    },
  },
  hearts: {
    // Số lượng tim bay (responsive) - tăng nhẹ trên desktop
    count: {
      mobile: 30,
      tablet: 30,
      desktop: 30,
    },
  },
} as const;

// ===== STORAGE KEYS =====
export const STORAGE_KEYS = {
  CHOICE: "love-confession-choice",
  MUSIC_ON: "love-confession-music",
  VISITED: "love-confession-visited",
} as const;

// ===== TYPES =====
export type ChoiceType = "primary" | "secondary";
export type DateOptionId = (typeof DATE_OPTIONS)[number]["id"];
