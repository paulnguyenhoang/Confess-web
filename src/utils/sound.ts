import { STORAGE_KEYS } from "./constants";
import { storage } from "./storage";

// Quản lý nhạc nền với audio file
class SoundManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isBlocked = false;

  constructor() {
    // Khởi tạo audio element
    this.audio = new Audio("/music/music.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.3;

    // Load trạng thái từ localStorage (mặc định ON)
    this.isPlaying = storage.get(STORAGE_KEYS.MUSIC_ON, true);
  }

  // Thử autoplay khi app mount
  async tryAutoplay(): Promise<boolean> {
    if (!this.audio || !this.isPlaying) return false;

    try {
      await this.audio.play();
      this.isBlocked = false;
      storage.set(STORAGE_KEYS.MUSIC_ON, true);
      return true;
    } catch (error) {
      // Autoplay bị chặn
      this.isBlocked = true;
      console.log("Autoplay blocked, waiting for user interaction");
      return false;
    }
  }

  // Bật nhạc (với user interaction)
  async play(): Promise<boolean> {
    if (!this.audio) return false;
    if (this.isPlaying && !this.audio.paused) return true;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.isBlocked = false;
      storage.set(STORAGE_KEYS.MUSIC_ON, true);
      return true;
    } catch (error) {
      console.warn("Failed to play sound:", error);
      return false;
    }
  }

  // Tắt nhạc (mute)
  stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.isPlaying = false;
    storage.set(STORAGE_KEYS.MUSIC_ON, false);
  }

  // Toggle on/off
  async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return await this.play();
    }
  }

  // Kiểm tra trạng thái
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Kiểm tra có bị block không
  getIsBlocked(): boolean {
    return this.isBlocked;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
