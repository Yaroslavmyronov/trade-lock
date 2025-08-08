'use client';
import { Nft } from '@/entities/nfts/types';
import { ActionWithModal } from '@/features/nft-action-with-modal/ui/ActionWithModal ';
import { MarketIcon } from '@/shared';
import { SellModal } from './SellModal';

interface SellButtonProps {
  selectedNfts: Nft[];
}

export const SellButton = ({ selectedNfts }: SellButtonProps) => {
  const sellPrice = selectedNfts.reduce((sum, nft) => sum + nft.lastPrice, 0);

  const noSelectedNfts = selectedNfts.length === 0;

  return (
    <ActionWithModal
      icon={<MarketIcon />}
      label="Sell now"
      subLabel={`${sellPrice.toFixed(4)} MON`}
      disabled={noSelectedNfts}
      ModalComponent={SellModal}
      modalProps={{ selectedNfts }}
    />
  );
};
