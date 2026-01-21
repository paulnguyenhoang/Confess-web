# 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB PAGES

## BƯỚC 1: Tạo Repository trên GitHub

1. Vào: https://github.com/new
2. Đăng nhập GitHub (đăng ký nếu chưa có)
3. Điền:
   - **Repository name**: `Love-web` (hoặc tên khác)
   - **Public** ✅
   - **KHÔNG** tick "Add README" ❌
   - **KHÔNG** tick "Add .gitignore" ❌
4. Click **"Create repository"**
5. Giữ trang GitHub lại (có URL dạng: `https://github.com/username/Love-web.git`)

---

## BƯỚC 2: Kiểm tra lại vite.config.ts

⚠️ **QUAN TRỌNG:** Mở file `vite.config.ts`, đảm bảo dòng `base` khớp với tên repository:

```typescript
base: "/Love-web/",  // ← Phải trùng tên repository
```

Nếu repository tên khác, ví dụ `my-love`, phải sửa thành:

```typescript
base: "/my-love/",
```

---

## BƯỚC 3: Chạy lệnh Push lên GitHub

Mở **Terminal/PowerShell** trong VS Code (Ctrl + `), chạy TỪNG LỆNH sau:

### 1️⃣ Khởi tạo Git:

```bash
git init
```

### 2️⃣ Thêm tất cả files:

```bash
git add .
```

### 3️⃣ Commit code:

```bash
git commit -m "Initial commit: Love Confession Web"
```

### 4️⃣ Đổi branch sang main:

```bash
git branch -M main
```

### 5️⃣ Kết nối với GitHub repository:

⚠️ **ĐỔI `username` và `Love-web` thành của bạn:**

```bash
git remote add origin https://github.com/username/Love-web.git
```

Ví dụ nếu username GitHub của bạn là `nguyenvana`:

```bash
git remote add origin https://github.com/nguyenvana/Love-web.git
```

### 6️⃣ Push code lên GitHub:

```bash
git push -u origin main
```

**Nếu hỏi username/password:**

- Username: tên GitHub của bạn
- Password: **KHÔNG phải mật khẩu**, phải dùng **Personal Access Token**

#### Cách tạo Personal Access Token:

1. Vào: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Điền:
   - Note: `Love Web Deploy`
   - Expiration: `90 days` (hoặc No expiration)
   - Tick: ✅ `repo` (tất cả)
4. Click **"Generate token"**
5. **COPY TOKEN** (dạng: `ghp_xxxxxxxxxxxxxx`) → Dán vào Password

---

## BƯỚC 4: Enable GitHub Pages

1. Vào repository trên GitHub: `https://github.com/username/Love-web`
2. Click tab **"Settings"** (góc phải)
3. Sidebar bên trái → Click **"Pages"**
4. Tại **"Build and deployment"**:
   - Source: Chọn **"GitHub Actions"**
5. Scroll xuống → Click **"Configure"** ở **"Static HTML"**
6. Sửa file workflow (nếu cần) → Click **"Commit changes"**

---

## BƯỚC 5: Tạo GitHub Actions Workflow

### Cách 1: Tạo file workflow thủ công

Tạo file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Sau đó:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

### Cách 2: Sử dụng gh-pages (ĐƠN GIẢN HƠN)

1. Cài package:

```bash
npm install --save-dev gh-pages
```

2. Mở `package.json`, thêm vào `"scripts"`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy bằng 1 lệnh:

```bash
npm run deploy
```

✅ **Xong!** Website sẽ tự động deploy.

---

## BƯỚC 6: Truy cập website

Sau 1-2 phút, vào:

```
https://username.github.io/Love-web/
```

(Đổi `username` và `Love-web` thành của bạn)

### Truy cập bằng điện thoại:

1. Mở trình duyệt trên điện thoại
2. Nhập URL: `https://username.github.io/Love-web/`
3. ✅ Website hiển thị!
4. Nếu nhạc không tự chạy → **Tap vào overlay "Chạm để bật nhạc 🎵"**

---

## 🔧 SỬA LỖI THƯỜNG GẶP

### Lỗi 1: Trang trắng sau khi deploy

**Nguyên nhân:** Sai `base` trong `vite.config.ts`

**Cách fix:**

1. Mở `vite.config.ts`
2. Sửa `base: "/Love-web/"` → đúng tên repository
3. Commit và push lại:

```bash
git add vite.config.ts
git commit -m "Fix base URL"
git push
```

### Lỗi 2: CSS/JS không load

**Nguyên nhân:** Cũng do sai `base`

**Cách fix:** Giống lỗi 1

### Lỗi 3: Nhạc không chạy trên mobile

**Nguyên nhân:** Autoplay bị chặn

**Cách fix:** Tap vào overlay "Chạm để bật nhạc 🎵" → nhạc sẽ chạy

### Lỗi 4: File nhạc 404

**Nguyên nhân:** Thiếu file `music.mp3`

**Cách fix:**

1. Đảm bảo file tồn tại: `public/music/music.mp3`
2. Commit và push lại:

```bash
git add public/music/music.mp3
git commit -m "Add music file"
git push
```

---

## 📱 TEST TRÊN MOBILE

1. Mở Chrome/Safari trên điện thoại
2. Vào: `https://username.github.io/Love-web/`
3. Kiểm tra:
   - ✅ Giao diện hiển thị đúng
   - ✅ Animation trái tim rơi xuống
   - ✅ Tap overlay → nhạc chạy
   - ✅ Chọn Yes → chuyển trang celebration
   - ✅ Modal hiển thị đúng
   - ✅ Responsive mượt mà

---

## 🎯 TÓM TẮT NHANH

```bash
# 1. Khởi tạo Git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 2. Kết nối GitHub
git remote add origin https://github.com/username/Love-web.git
git push -u origin main

# 3. Cài gh-pages
npm install --save-dev gh-pages

# 4. Thêm script deploy vào package.json:
# "deploy": "npm run build && gh-pages -d dist"

# 5. Deploy
npm run deploy

# 6. Truy cập
# https://username.github.io/Love-web/
```

---

## 🆘 CẦN TRỢ GIÚP?

- GitHub Docs: https://docs.github.com/pages
- Vite Deploy Docs: https://vitejs.dev/guide/static-deploy.html#github-pages
