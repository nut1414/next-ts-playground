import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { MsgData } from '../Msg'
import { handleConnect, handleConnectError, handleIncomingMsg, handleJoinRoom } from './io/listenEvent'
import { emitJoinRoom, emitRequestAllMsg, emitSendChatMsg } from './io/emitEvent'

export enum ChatConnectionStatus {
  CONNECTING = 'connecting',  // Initial Connection
  ERROR = 'error',            // 'connect_error' event recieved
  CONNECTED = 'connected',    // 'connect' event recieved
  JOINED = 'joined'           // 'join:success' recieved
}

export enum MsgActionType {
  ADD = 'add',
  SET = 'set',
  REMOVE = 'remove',
  CLEAR = 'clear'
}

export type MsgAction = AddChatMsg | SetChatMsg | RemoveChatMsg | ClearChatMsg

type AddChatMsg = {
  type: MsgActionType.ADD,
  msgs: MsgData[]
}

type RemoveChatMsg = {
  type: MsgActionType.REMOVE,
  index: number
}

type ClearChatMsg = {
  type: MsgActionType.CLEAR,
}

type SetChatMsg = Omit<AddChatMsg, 'type'> & { type: MsgActionType.SET }

const doChatMsgs = (state: MsgData[], msgAction: MsgAction ): MsgData[] => {
  if (msgAction.type === MsgActionType.ADD) {
    return [...state, ...msgAction.msgs]
  }else if (msgAction.type === MsgActionType.SET) {
    return [...msgAction.msgs]
  }else if (msgAction.type === MsgActionType.REMOVE) {
    return [...state].splice(msgAction.index)
  }else if (msgAction.type === MsgActionType.CLEAR) {
    return []
  }
  return state
}

const useChat = (chatId: string) => {
  const [chatMsgs, changeChatMsgs] = useReducer(doChatMsgs, [] as MsgData[])
  const [connectionStatus, setConnectStatus] = useState<ChatConnectionStatus>(ChatConnectionStatus.CONNECTING)
  const socketRef = useRef<Socket>()
  const handleSocketEvent = (socket: Socket) => {
    handleConnect(socket, setConnectStatus)
    handleConnectError(socket, setConnectStatus)
    handleIncomingMsg(socket, changeChatMsgs)
    handleJoinRoom(socket, setConnectStatus)
  }


  const sendChatMsg = (sender: string, senderId: string, data: string) => {
    if (socketRef.current && connectionStatus === ChatConnectionStatus.JOINED)
      emitSendChatMsg(socketRef.current, {sender, senderId, data})
  }

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || '')
    handleSocketEvent(socketRef.current)
    socketRef.current.onAny((msg)=> {
      console.log('Incoming Event:',msg)
    })
    return () => {
      socketRef.current?.disconnect()
    }
  }, [])


  useEffect(() => {
    const socket = socketRef.current
    switch (connectionStatus) {
    case ChatConnectionStatus.CONNECTING: {
      console.log('Connecting to chat server')
      break
    }
    case ChatConnectionStatus.ERROR: {
      console.log('Chat connection error.')
      break
    }
    case ChatConnectionStatus.CONNECTED: {
      console.log('Successfully connected to chat server')
      if (socket){
        console.log('Joining room')
        emitJoinRoom(socket, chatId)
      }
      break
    }
    case ChatConnectionStatus.JOINED: {
      console.log('Successfully join chat room.')
      if (socket){
        emitRequestAllMsg(socket)
      }
      
      break
    }
    }
      
  }, [connectionStatus, chatId])

  return { chatMsgs, changeChatMsgs, sendChatMsg, connectionStatus }
}

export default useChat