'use client'

import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {io as ClientIO, Socket} from "socket.io-client"

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
socket: null,
isConnected: false
})

export const useSocket = () => useContext(SocketContext)

export const WebSocketProvider: FC<{children: ReactNode}> = ({children}) => {
const [isConnected, setIsConnected] = useState(false)

  const socket = useMemo(() => {
    const siteUrl = process.env.NEXT_PUBLIC_URL

    if (!siteUrl) {
      console.error('NEXT_PUBLIC_URL is not defined')
      return null
    }

    return ClientIO(siteUrl, {
      path: '/api/web-socket/io',
      addTrailingSlash: false,
    })
  }, [])

  useEffect(() => {
    if (!socket) return

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.disconnect()
    }
  }, [socket])


  return <SocketContext.Provider value={{socket, isConnected}}>
    {children}
  </SocketContext.Provider>
}