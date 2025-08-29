'use client';

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
type WSContextType = {
  connection: HubConnection | null;
};

const WSContext = createContext<WSContextType>({ connection: null });

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const connectionRef = useRef<HubConnection | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_WS_URL!)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connection.on('marketUpdated', () => {
      queryClient.invalidateQueries({ queryKey: ['market'] });
    });

    connection.start().catch(console.error);
    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);
  return (
    <WSContext.Provider value={{ connection: connectionRef.current }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => useContext(WSContext);
