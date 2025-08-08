'use client';
import { Nft } from '@/entities/nfts/types';
import { ActionWithModal } from '@/features/nft-action-with-modal/ui/ActionWithModal ';
import { SellModal } from '@/features/nft-sell/ui/SellModal';
import { Arrow2Icon } from '@/shared';

interface SellButtonProps {
  selectedNftsUser: Nft[];
  selectedNftsMarket: Nft[];
}

export const TradeButton = ({
  selectedNftsUser,
  selectedNftsMarket,
}: SellButtonProps) => {
  const noSelectedNfts =
    selectedNftsUser.length === 0 || selectedNftsMarket.length === 0;

  return (
    <ActionWithModal
      icon={<Arrow2Icon width={24} height={24} />}
      label="Trade"
      subLabel={`${selectedNftsUser.length} x  ${selectedNftsMarket.length} item`}
      disabled={noSelectedNfts}
      ModalComponent={SellModal}
      modalProps={{ selectedNfts: selectedNftsUser }}
    />
  );
};
