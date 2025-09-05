'use client';
import { marketNftsApi } from '@/entities/nfts/api/marketNftsApi';
import { Propose } from '@/features';
import { FilterPanel } from '@/features/filter-panel';
import { DelistButton } from '@/features/nft-delist';
import { Counter } from '@/shared';
import { useIntersection } from '@/shared/lib/useIntersection';
import { useFilters } from '@/shared/store/useFilters';
import { useOnSaleSelectedNfts } from '@/shared/store/useOnSaleSelectedNfts';
import { usePropose } from '@/shared/store/usePropose';
import { MarketNfts } from '@/widgets/Market/ui/MarketNfts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export const OnSale = () => {
  const { selectedNfts, clearAll, toggleSelect, removeItem } =
    useOnSaleSelectedNfts();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  const { address } = useAccount();
  const {
    data: userListedResponse,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    ...marketNftsApi.getListInfiniteQueryOptions({
      seller: address,
    }),
  });

  const cursorRef = useIntersection(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div className={`size-full ${opened === 'user' && 'pl-[385px]'}`}>
      <div className="relative flex min-h-full max-w-full grow flex-col px-5">
        <FilterPanel
          refresh={refetch}
          isRefresh={isRefetching}
          panel="user"
          close={close}
          opened={opened}
          open={open}
        />
        <MarketNfts
          status={status}
          error={error}
          selectedNfts={selectedNfts}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          nftsData={userListedResponse?.items ?? []}
          cursorRef={cursorRef}
          isFetchingNextPage={isFetchingNextPage}
        />
        <Counter
          isOpen={isOpen}
          toggle={toggle}
          selectedNfts={selectedNfts}
          clearAll={clearAll}
        />
        <Propose
          isOpen={isOpen}
          removeItem={removeItem}
          toggleSelect={toggleSelect}
          selectedNfts={selectedNfts ?? []}
        />

        <div className="flex pb-4">
          <DelistButton selectedNfts={selectedNfts}></DelistButton>
        </div>
      </div>
    </div>
  );
};
