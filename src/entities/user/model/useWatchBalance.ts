import { useEffect } from 'react';

import { monadTestnet } from '@/shared/config/wagmi/chains';
import { useQueryClient } from '@tanstack/react-query';
import { UseBalanceParameters, useBalance, useBlockNumber } from 'wagmi';

export const useWatchBalance = (useBalanceParameters: UseBalanceParameters) => {
  const targetNetwork = monadTestnet;
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: targetNetwork.id,
  });
  const { queryKey, ...restUseBalanceReturn } =
    useBalance(useBalanceParameters);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  return restUseBalanceReturn;
};
