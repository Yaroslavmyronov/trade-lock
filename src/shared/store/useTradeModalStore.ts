import { Trade } from '@/entities/trade';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface TradeModalState {
  isOpen: boolean;
  tradeData: Trade | null;
  open: (trade: Trade, footer?: ReactNode) => void;
  close: () => void;
  footer?: ReactNode;
}

export const useTradeModalStore = create<TradeModalState>((set) => ({
  isOpen: false,
  tradeData: null,
  footer: undefined,
  open: (trade, footer) => set({ isOpen: true, tradeData: trade, footer }),
  close: () => set({ isOpen: false, tradeData: null, footer: undefined }),
}));
