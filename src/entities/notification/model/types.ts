export interface Notification {
  id: string;
  title: string;
  body?: string;
  isRead?: boolean;
  createdAt: string;
  type: 'TradeCreated' | 'TradeAccepted' | 'TradeCompleted' | 'TradeRejected';
}
