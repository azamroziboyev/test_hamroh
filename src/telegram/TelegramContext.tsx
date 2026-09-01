/**
 * Telegram WebApp React Context Provider
 * Provides reactive access to Telegram environment, user data, and native helpers.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TelegramService } from './telegramService';
import { TelegramUser } from '../types';

interface TelegramContextValue {
  isTelegram: boolean;
  telegramUser: TelegramUser | null;
  initData: string;
  triggerHaptic: (type?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => void;
}

const TelegramContext = createContext<TelegramContextValue>({
  isTelegram: false,
  telegramUser: null,
  initData: '',
  triggerHaptic: () => {},
});

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState('');

  useEffect(() => {
    TelegramService.init();
    const available = TelegramService.isAvailable();
    setIsTelegram(available);
    setTelegramUser(TelegramService.getUser());
    setInitData(TelegramService.getInitData());
  }, []);

  return (
    <TelegramContext.Provider
      value={{
        isTelegram,
        telegramUser,
        initData,
        triggerHaptic: TelegramService.haptic,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
