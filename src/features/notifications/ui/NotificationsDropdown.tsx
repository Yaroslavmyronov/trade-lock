'use client';

import { NotificationItem } from '@/entities/notification';
import { Popover } from '@/shared';
import { useNotificationsStore } from '@/shared/store/useNotificationStore';
import { useTradesModalStore } from '@/shared/store/useTradesModalStore';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { useEffect, useRef } from 'react';
import { BellButton } from './BellButton';
import { ClearUnread } from './ClearUnread';
import { NotificationsHeader } from './NotificationsHeader';

export const NotificationsDropdown = () => {
  const connectionRef = useRef<HubConnection | null>(null);
  const { open } = useTradesModalStore();
  const { setUnreadCount, setNotifications, unreadCount, notifications } =
    useNotificationsStore();
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_WS_URL!)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    connection.on('unreadCountUpdated', (data) => {
      setUnreadCount(data);
    });
    connection.on('initNotifications', (data) => {
      setNotifications(data);
    });

    connection.start();
    connectionRef.current = connection;
    return () => {
      connection.stop();
    };
  }, []);

  const markAsRead = (id: string) => {
    if (connectionRef.current) {
      connectionRef.current.invoke('markAsRead', id).catch(console.error);
    }
  };
  const MarkAllAsRead = () => {
    if (connectionRef.current) {
      connectionRef.current.invoke('markAllAsRead').catch(console.error);
    }
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
              <ClearUnread MarkAllAsRead={MarkAllAsRead} />
            </>
          ) : (
            <div className="p-2 text-center text-gray-400">
              No notifications
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
};
