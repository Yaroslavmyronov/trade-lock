'use client';

import { useWS } from '@/app/providers/webSocketProvider';
import { NotificationItem } from '@/entities/notification';
import { Popover } from '@/shared';
import { useNotificationsStore } from '@/shared/store/useNotificationStore';
import { useHandleNotificationClick } from '../lib';
import { BellButton } from './BellButton';
import { ClearUnread } from './ClearUnread';
import { NotificationsHeader } from './NotificationsHeader';

export const NotificationsDropdown = () => {
  const { connection } = useWS();

  const { unreadCount, notifications } = useNotificationsStore();

  const handleNotificationClick = useHandleNotificationClick(connection);

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
              {notifications.map((n) => {
                return (
                  <NotificationItem
                    key={n.id}
                    onClick={() => handleNotificationClick(n.status, n.id)}
                    title={n.title}
                    body={n.body}
                    time={n.createdAt}
                  />
                );
              })}
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
