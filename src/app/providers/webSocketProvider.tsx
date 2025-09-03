'use client';

import { useNotificationsStore } from '@/shared/store/useNotificationStore';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type WSContextType = {
  connection: HubConnection | null;
};

const WSContext = createContext<WSContextType>({
  connection: null,
});

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const queryClient = useQueryClient();
  const { setUnreadCount, setNotifications } = useNotificationsStore();

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_WS_URL!)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    conn.on('updateMarket', () => {
      queryClient.invalidateQueries({ queryKey: ['market'] });
    });
    conn.on('unreadcountupdated', (data: number) => setUnreadCount(data));

    conn.on('initNotifications', (data: any[]) => setNotifications(data));

    conn
      .start()
      .then(() => {
        setConnection(conn);
      })
      .catch(console.error);

    return () => {
      conn.stop();
    };
  }, []);

  return (
    <WSContext.Provider value={{ connection }}>{children}</WSContext.Provider>
  );
};

export const useWS = () => useContext(WSContext);
