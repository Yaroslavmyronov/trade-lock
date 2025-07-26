import { Nft } from '@/entities/nfts/types';
import { create } from 'zustand';

interface SelectedCardsState {
  selectedNfts: Nft[];
  toggleSelect: (nft: Nft) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useSelectedNfts = create<SelectedCardsState>((set) => ({
  selectedNfts: [],
  toggleSelect: (nft) =>
    set((state) => {
      const id = `${nft.contract}-${nft.tokenId}`;
      const exists = state.selectedNfts.some(
        (c) => `${c.contract}-${c.tokenId}` === id,
      );
      return {
        selectedNfts: exists
          ? state.selectedNfts.filter(
              (c) => `${c.contract}-${c.tokenId}` !== id,
            )
          : [...state.selectedNfts, nft],
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      selectedNfts: state.selectedNfts.filter(
        (c) => `${c.contract}-${c.tokenId}` !== id,
      ),
    })),
  clearAll: () => set({ selectedNfts: [] }),
}));
