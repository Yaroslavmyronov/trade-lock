'use client';

import { NotificationItem } from '@/entities/notification';
import { Popover } from '@/shared';
import { useNotificationsStore } from '@/shared/store/useNotificationStore';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect } from 'react';
import { BellButton } from './BellButton';
import { NotificationsHeader } from './NotificationsHeader';

export const NotificationsDropdown = () => {
  const { setUnreadCount, setNotifications, unreadCount, notifications } =
    useNotificationsStore();
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5108/notificationHub')
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    connection.on('unreadCountUpdated', (data) => {
      setUnreadCount(data);
    });
    connection.on('initNotifications', (data) => {
      setNotifications(data);
      console.log('initNotifications', data);
    });

    connection.start();
    return () => {
      console.log('disconnectedWebSocket');
      connection.stop();
    };
  }, []);
  if (notifications === null || unreadCount === null) return null;

  return (
    <Popover trigger={<BellButton unreadCount={unreadCount} />}>
      <div className="max-h-[426px] w-[420px] overflow-y-hidden whitespace-nowrap">
        <NotificationsHeader unreadCount={unreadCount}></NotificationsHeader>
        {notifications.length ? (
          notifications.map((n) => (
            <NotificationItem
              key={n.id}
              href=""
              title={n.title}
              body={n.body}
              time={n.createdAt}
            />
          ))
        ) : (
          <div className="p-2 text-gray-400">Нет уведомлений</div>
        )}
      </div>
    </Popover>
  );
};
