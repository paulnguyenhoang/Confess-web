# 💗 Love Confession Web

Trang web tỏ tình lãng mạn với 2 màn hình tương tác, responsive mọi thiết bị.

## 🚀 Cài đặt và chạy dự án

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Các bước chạy

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Mở trình duyệt tại http://localhost:3000
```

### Build production

```bash
npm run build
npm run preview
```

## 📁 Cấu trúc dự án

```
├── src/
│   ├── components/       # UI components
│   │   ├── AppShell.tsx
│   │   ├── LoveCard.tsx
│   │   ├── FloatingHearts.tsx
│   │   ├── ToggleMusic.tsx
│   │   ├── PolaroidGallery.tsx
│   │   └── ActionButton.tsx
│   ├── pages/           # Các màn hình
│   │   ├── ConfessPage.tsx      (/)
│   │   └── CelebrationPage.tsx  (/yay)
│   ├── hooks/           # Custom hooks
│   │   ├── useTypewriter.ts
│   │   └── usePrefersReducedMotion.ts
│   ├── utils/           # Helper functions & constants
│   │   ├── constants.ts  ⭐ CHỈNH NỘI DUNG Ở ĐÂY
│   │   ├── storage.ts
│   │   ├── motion.ts
│   │   └── sound.ts
│   ├── styles/          # CSS
│   │   ├── tailwind.css
│   │   └── theme.css    ⭐ CHỈNH MÀU SẮC Ở ĐÂY
│   ├── router.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── README.md
```

## ✏️ Cách tùy chỉnh

### 1️⃣ Thay đổi text hiển thị

Mở file **`src/utils/constants.ts`** và chỉnh sửa:

```typescript
export const CONTENT = {
  confess: {
    title: "Làm bạn gái anh nha? 💗", // ← Đổi title ở đây
    typewriterTexts: [
      "Câu 1...", // ← Đổi các câu typewriter
      "Câu 2...",
      "Câu 3...",
    ],
    buttons: {
      primary: "Em đồng ý 💖", // ← Đổi text button
      secondary: "Okk anh 😳",
    },
  },
  // ... các phần khác
};
```

### 2️⃣ Thay đổi màu sắc / gradient

Mở file **`src/styles/theme.css`**:

```css
:root {
  /* Đổi màu gradient nền */
  --gradient-from: #fce7f3; /* pink-100 */
  --gradient-via: #e9d5ff; /* purple-200 */
  --gradient-to: #ddd6fe; /* violet-200 */

  /* Đổi shadow/glow của card */
  --card-shadow: 0 8px 32px 0 rgba(236, 72, 153, 0.15);
  --card-glow: 0 0 40px rgba(236, 72, 153, 0.2);
}
```

### 3️⃣ Chỉnh danh sách "hẹn hò"

Trong **`src/utils/constants.ts`**:

```typescript
export const DATE_OPTIONS = [
  {
    id: "food",
    emoji: "🍜",
    title: "Đi ăn cùng nhau", // ← Đổi title
    description: "Thử món ngon mới...", // ← Đổi mô tả
  },
  // Thêm option mới:
  {
    id: "coffee",
    emoji: "☕",
    title: "Đi cafe",
    description: "Ngồi cafe chém gió",
  },
];
```

### 4️⃣ Thay đổi số lượng tim bay

Trong **`src/utils/constants.ts`**:

```typescript
export const THEME = {
  hearts: {
    count: {
      mobile: 8, // ← Đổi số lượng cho mobile
      tablet: 12, // ← Đổi cho tablet
      desktop: 15, // ← Đổi cho desktop
    },
  },
};
```

### 5️⃣ Thay nhạc nền

**ĐƠN GIẢN:** Đặt file nhạc vào **`public/music/music.mp3`**

- Format: MP3, OGG, hoặc M4A
- Dung lượng: < 5MB (nhẹ nhàng)
- Âm lượng: đã normalize, không quá to
- Nội dung: nhạc nền nhẹ nhàng, lãng mạn

**Nhạc sẽ tự động phát khi vào web.** Nếu trình duyệt chặn autoplay, sẽ hiển thị overlay "Chạm để bật nhạc 🎵".

## 🎨 Tính năng

✅ Responsive mobile-first (320px → 1440px+)  
✅ Animation mượt với framer-motion  
✅ Hỗ trợ `prefers-reduced-motion` (giảm animation nếu user bật)  
✅ Confetti tim khi chuyển màn 2  
✅ Typewriter effect tự động  
✅ Glassmorphism cards  
✅ Tim bay + sparkle background  
✅ Toggle nhạc nền  
✅ Modal responsive (bottom sheet trên mobile)  
✅ Lưu trạng thái với localStorage

## 📱 Responsive breakpoints

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## 🛠️ Tech Stack

- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Lucide React** - Icons
- **Canvas Confetti** - Confetti effect

## 📝 Ghi chú

- Không tự động phát nhạc (tuân thủ UX best practices)
- Chỉ phát nhạc khi user bấm nút ToggleMusic
- Trạng thái lưu trong localStorage: lựa chọn button + nhạc on/off
- Animation giảm tự động nếu user bật reduce motion trong OS

## 🐛 Troubleshooting

**Lỗi "Cannot find module":**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 đã bị chiếm:**
Đổi port trong `vite.config.ts`:

```typescript
server: {
  port: 3001;
}
```

## 💕 Enjoy!

Chúc bạn thành công với lời tỏ tình! 🥰
