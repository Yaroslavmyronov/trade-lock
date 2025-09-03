import { create } from 'zustand';

export type NotificationType =
  | 'TradeCreated'
  | 'TradeAccepted'
  | 'TradeCompleted'
  | 'TradeRejected';

export interface Notification {
  id: string;
  title: string;
  body: string;
  status: NotificationType;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsState {
  unreadCount: number | null;
  notifications: Notification[] | null;
  setUnreadCount: (count: number) => void;
  setNotifications: (list: Notification[]) => void;
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  unreadCount: null,
  notifications: null,
  setUnreadCount: (count) => set({ unreadCount: count }),
  setNotifications: (list) => set({ notifications: list }),
  addNotification: (n) =>
    set((state) => ({
      notifications: state.notifications ? [n, ...state.notifications] : [n],
      unreadCount: n.isRead
        ? (state.unreadCount ?? 0)
        : (state.unreadCount ?? 0) + 1,
    })),
  markAsRead: (id) =>
    set((state) => {
      if (!state.notifications) return state;
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),
}));
