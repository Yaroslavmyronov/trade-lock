'use client';

import { useWS } from '@/app/providers/webSocketProvider';
import { NotificationItem } from '@/entities/notification';
import { Popover } from '@/shared';
import { useNotificationsStore } from '@/shared/store/useNotificationStore';
import { useTradesModalStore } from '@/shared/store/useTradesModalStore';
import { useEffect } from 'react';
import { BellButton } from './BellButton';
import { ClearUnread } from './ClearUnread';
import { NotificationsHeader } from './NotificationsHeader';

export const NotificationsDropdown = () => {
  const { connection } = useWS();

  const { open } = useTradesModalStore();
  const { setUnreadCount, setNotifications, unreadCount, notifications } =
    useNotificationsStore();
  useEffect(() => {
    if (!connection) return;
    const handleUnreadCount = (data: number) => setUnreadCount(data);
    const handleInitNotifications = (data: any[]) => setNotifications(data);

    connection.on('unreadCountUpdated', handleUnreadCount);
    connection.on('initNotifications', handleInitNotifications);

    return () => {
      connection.off('unreadCountUpdated', handleUnreadCount);
      connection.off('initNotifications', handleInitNotifications);
    };
  }, []);

  const markAsRead = (id: string) => {
    connection?.invoke('markAsRead', id).catch(console.error);
  };
  const MarkAllAsRead = () => {
    connection?.invoke('markAllAsRead').catch(console.error);
  };

  if (notifications === null || unreadCount === null) return null;

  return (
    <Popover trigger={<BellButton unreadCount={unreadCount} />}>
      <div className="w-[420px] overflow-y-hidden">
        <NotificationsHeader unreadCount={unreadCount}></NotificationsHeader>
        <div className="flex max-h-[376px] flex-col overflow-y-auto">
          {notifications.length ? (
            <>
              {notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  open={() => open()}
                  onRead={() => markAsRead(n.id)}
                  title={n.title}
                  body={n.body}
                  time={n.createdAt}
                />
              ))}
            </>
          ) : (
            <div className="p-2 text-center text-gray-400">
              No notifications
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <ClearUnread MarkAllAsRead={MarkAllAsRead} />
        )}
      </div>
    </Popover>
  );
};
