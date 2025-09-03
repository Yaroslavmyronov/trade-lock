import { useHistoryModalStore } from '@/shared/store/useHistoryModalStore';
import { useTradesModalStore } from '@/shared/store/useTradesModalStore';
import { useRouter } from 'next/navigation';

export const useHandleNotificationClick = (connection: any) => {
  const { open } = useTradesModalStore();
  const { open: openHistory } = useHistoryModalStore();
  const router = useRouter();

  const markAsRead = (id: string) => {
    connection?.invoke('markAsRead', id).catch(console.error);
  };

  return (type: string, id: string) => {
    switch (type) {
      case 'ListingCreated':
        router.push('/on-sale');
        markAsRead(id);
        break;
      case 'ListingRemoved':
        markAsRead(id);
        break;
      case 'ListingSold':
      case 'ListingBought':
      case 'TradeAccepted':
      case 'TradeRejected':
        openHistory();
        markAsRead(id);
        break;
      case 'TradeCreated':
        open('Sent');
        markAsRead(id);
        break;
      case 'TradeReceived':
        open('Incoming');
        markAsRead(id);
        break;
      default:
        markAsRead(id);
        break;
    }
  };
};
