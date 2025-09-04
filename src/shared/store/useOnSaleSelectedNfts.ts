import { MarketNft } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';
import { create } from 'zustand';

interface SelectedNftsState {
  selectedNfts: MarketNft[];
  toggleSelect: (nft: MarketNft) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useOnSaleSelectedNfts = create<SelectedNftsState>((set) => ({
  selectedNfts: [],
  toggleSelect: (nft) =>
    set((state) => {
      const id = getNftId(nft);
      const exists = state.selectedNfts.some(
        (c) => `${c.contractAddress}-${c.tokenId}` === id,
      );
      return {
        selectedNfts: exists
          ? state.selectedNfts.filter(
              (c) => `${c.contractAddress}-${c.tokenId}` !== id,
            )
          : [...state.selectedNfts, nft],
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      selectedNfts: state.selectedNfts.filter(
        (c) => `${c.contractAddress}-${c.tokenId}` !== id,
      ),
    })),
  clearAll: () => set({ selectedNfts: [] }),
}));
