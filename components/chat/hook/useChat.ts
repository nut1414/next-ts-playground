import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { handleConnect, handleConnectError, handleIncomingMsg, handleJoinRoom } from './io/listenEvent'
import { emitJoinRoom, emitRequestAllMsg, emitSendChatMsg } from './io/emitEvent'
import mongoose from 'mongoose'

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

type MsgContentType = 'text' | 'image' | 'empty'
export interface IMsgData {
  id?: string
  _id?: string
  sender: string
  senderId: string
  content: string
  contentType: MsgContentType
  timestamp?: number
}

export class MsgData {
  public id?: string                  // id should be create on backend server
  public sender: string
  public senderId: string
  public content: string
  public contentType: MsgContentType
  public timestamp: number
  constructor(msg: IMsgData){
    this.id = msg.id || msg._id
    this.sender = msg.sender
    this.senderId = msg.senderId
    this.content = msg.content
    this.contentType = msg.contentType
    this.timestamp = msg.timestamp || 0
  }
}

export class InboundMsgData extends MsgData {
  static total: number = 0
  constructor(msg: IMsgData){
    super(msg)
    InboundMsgData.total++
  }
  public static fromObjArray(msgarr: IMsgData[]): InboundMsgData[]{
    return msgarr.map((msg) => new InboundMsgData(msg))
  }
  
}
export class OutboundMsgData extends MsgData {
  static total: number = 0
  constructor(msg: IMsgData){
    super(msg)
    OutboundMsgData.total++
  }
  public static fromObjArray(msgarr: IMsgData[]): OutboundMsgData[]{
    return msgarr.map((msg) => new OutboundMsgData(msg))
  }
}

export type MsgAction = AddChatMsg | SetChatMsg | RemoveChatMsg | ClearChatMsg

type AddChatMsg = {
  type: MsgActionType.ADD,
  msgs: MsgData[]
}

type MsgDataIndex = number

type RemoveChatMsg = {
  type: MsgActionType.REMOVE,
  index: MsgDataIndex
}

type ClearChatMsg = {
  type: MsgActionType.CLEAR,
}

type SetChatMsg = Omit<AddChatMsg, 'type'> & { type: MsgActionType.SET }

function doChatMsgs(state: MsgData[], msgAction: AddChatMsg | SetChatMsg | RemoveChatMsg | ClearChatMsg ): MsgData[]  {
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
  const handleListenIoEvent = (socket: Socket) => {
    handleConnect(socket, setConnectStatus)
    handleConnectError(socket, setConnectStatus)
    handleIncomingMsg(socket, changeChatMsgs)
    handleJoinRoom(socket, setConnectStatus)
    socket.onAny((msg) => {
      console.log('Incoming Event:',msg)
    })
  }

  const sendTextChatMsg = (sender: string, senderId: string, content: string) => {
    if (socketRef.current && connectionStatus === ChatConnectionStatus.JOINED){
      const newMsg = new OutboundMsgData({
        sender,
        senderId,
        content,
        contentType: 'text'
      }) 
      emitSendChatMsg(socketRef.current, newMsg)
    }
  }

  const sendChatMsg = (msg: MsgData) => {
    if (socketRef.current && connectionStatus === ChatConnectionStatus.JOINED){
      emitSendChatMsg(socketRef.current, msg)
    }
  }



  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || '')
    handleListenIoEvent(socketRef.current)
  
    return () => {
      socketRef.current?.disconnect()
    }
  }, [])


  useEffect(() => {
    const socket = socketRef.current
    switch (connectionStatus) {
    case ChatConnectionStatus.CONNECTING: {
      console.log('Connecting to chat server.')
      break
    }
    case ChatConnectionStatus.ERROR: {
      console.log('Chat connection error.')
      break
    }
    case ChatConnectionStatus.CONNECTED: {
      console.log('Successfully connected to chat server.')
      if (socket){
        console.log('Joining room...')
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

  return { chatMsgs, changeChatMsgs, sendChatMsg, sendTextChatMsg, connectionStatus }
}

export default useChat