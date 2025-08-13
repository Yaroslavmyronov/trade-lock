'use client';
import { MarketNftResponse, UserNftResponse } from '@/entities/nfts/types';
import { ActionWithModal } from '@/features/nft-action-with-modal/ui/ActionWithModal ';
import { Arrow2Icon } from '@/shared';
import { TradeModal } from './TradeModal';

interface TradeButtonProps {
  selectedNftsUser: UserNftResponse;
  selectedNftsMarket: MarketNftResponse;
}

export const TradeButton = ({
  selectedNftsUser,
  selectedNftsMarket,
}: TradeButtonProps) => {
  const noSelectedNfts =
    selectedNftsUser.length === 0 || selectedNftsMarket.length === 0;

  return (
    <ActionWithModal
      icon={<Arrow2Icon width={24} height={24} />}
      label="Trade"
      subLabel={
        noSelectedNfts
          ? ''
          : `${selectedNftsUser.length} x ${selectedNftsMarket.length} item`
      }
      disabled={noSelectedNfts}
      ModalComponent={TradeModal}
      modalProps={{ selectedNfts: selectedNftsUser }}
    />
  );
};
