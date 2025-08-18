'use client';
import { NotificationsIcon } from '@/shared';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export const TradesNotification = () => {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5108/notificationHub')
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connection.on('initNotifications', (data) => {
      console.log('InitNotifications', data);
    });

    connection.start();
    return () => {
      console.log('disconnectedWebSocket');
      // connection.stop();
    };
  }, []);

  if (!isConnected || !address) {
    return null;
  }
  return (
    <button className="inline-flex cursor-pointer items-center justify-center px-2">
      <div className="relative">
        <NotificationsIcon></NotificationsIcon>
        <div className="absolute top-0 right-0 size-2.5 rounded-full text-[10px] leading-2.5">
          1
        </div>
      </div>
    </button>
  );
};
