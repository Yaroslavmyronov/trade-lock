import { Trade } from '@/entities/trade';
import { NewTrade } from '@/entities/trade/model/type';
import { ReactNode } from 'react';
import { create } from 'zustand';

type TradeData =
  | Trade
  | (NewTrade & { tradeId?: string; isIncoming?: boolean });

interface TradeModalState {
  isOpen: boolean;
  tradeData: TradeData | null;
  open: (trade: TradeData, footer?: ReactNode) => void;
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
