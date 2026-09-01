/**
 * Telegram WebApp Integration Service
 * 
 * Manages communication with the Telegram WebApp JS SDK:
 * - Viewport expansion & readiness
 * - Native MainButton & BackButton controls
 * - Haptic feedback integration
 * - Telegram theme colors & user initData
 * 
 * NOTE FOR BACKEND FASTAPI INTEGRATION:
 * When sending requests to FastAPI, include `TelegramService.getInitData()` in the 
 * `X-Telegram-Init-Data` header for server-side HMAC-SHA256 validation.
 */

import { TelegramUser } from '../types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initData: string;
        initDataUnsafe: {
          user?: TelegramUser;
          query_id?: string;
          auth_date?: number;
          hash?: string;
          start_param?: string;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
        };
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        openTelegramLink: (url: string) => void;
        openLink: (url: string) => void;
        sendData: (data: string) => void;
      };
    };
  }
}

export class TelegramService {
  private static tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

  /**
   * Initializes the Telegram WebApp viewport and tells Telegram the app is ready.
   */
  public static init(): void {
    if (this.tg) {
      try {
        this.tg.ready();
        this.tg.expand();
        this.tg.setHeaderColor('#f1f5f9');
        this.tg.setBackgroundColor('#f1f5f9');
      } catch (e) {
        console.warn('[TelegramWebApp] Error during initialization:', e);
      }
    }
  }

  /**
   * Checks if running inside actual Telegram client
   */
  public static isAvailable(): boolean {
    return Boolean(this.tg && this.tg.initData);
  }

  /**
   * Gets authenticated Telegram user data passed by Telegram client
   */
  public static getUser(): TelegramUser | null {
    return this.tg?.initDataUnsafe?.user || null;
  }

  /**
   * Gets raw initData string for FastAPI cryptographic verification
   * Expected Header: `X-Telegram-Init-Data: <initData>`
   */
  public static getInitData(): string {
    return this.tg?.initData || '';
  }

  /**
   * Triggers lightweight haptic feedback on supported mobile devices
   */
  public static haptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection' = 'light'): void {
    if (!this.tg?.HapticFeedback) return;
    try {
      if (type === 'success' || type === 'warning' || type === 'error') {
        this.tg.HapticFeedback.notificationOccurred(type);
      } else if (type === 'selection') {
        this.tg.HapticFeedback.selectionChanged();
      } else {
        this.tg.HapticFeedback.impactOccurred(type);
      }
    } catch {
      // Haptics not available
    }
  }

  /**
   * Controls the Telegram Native BackButton
   */
  public static setBackButton(visible: boolean, onClick?: () => void): void {
    if (!this.tg?.BackButton) return;
    try {
      if (visible && onClick) {
        this.tg.BackButton.show();
        this.tg.BackButton.onClick(onClick);
      } else {
        this.tg.BackButton.hide();
      }
    } catch {
      // Ignore in non-telegram environments
    }
  }

  /**
   * Controls the Telegram Native MainButton
   */
  public static setMainButton(options: {
    text: string;
    visible: boolean;
    color?: string;
    onClick?: () => void;
  }): void {
    if (!this.tg?.MainButton) return;
    try {
      if (options.visible) {
        this.tg.MainButton.setText(options.text);
        if (options.color) this.tg.MainButton.color = options.color;
        this.tg.MainButton.show();
        this.tg.MainButton.enable();
        if (options.onClick) {
          this.tg.MainButton.onClick(options.onClick);
        }
      } else {
        this.tg.MainButton.hide();
      }
    } catch {
      // Ignore
    }
  }
}
