import { useEffect, useReducer, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { MsgData } from '../Msg'
import { handleIncomingMsg } from './io/ioListenEvent'
import { emitRequestAllMsg, emitSendChatMsg } from './io/ioSendEvent'

export enum MsgActionType {
  addMsg,
  setMsg,
  removeMsg,
  clearMsg
}

export type MsgAction = AddChatMsg | SetChatMsg | RemoveChatMsg | ClearChatMsg

type AddChatMsg = {
  type: MsgActionType.addMsg,
  msgs: MsgData[]
}

type RemoveChatMsg = {
  type: MsgActionType.removeMsg,
  index: number
}

type ClearChatMsg = {
  type: MsgActionType.clearMsg,
}

type SetChatMsg = Omit<AddChatMsg, 'type'> & { type: MsgActionType.setMsg }



const doChatMsgs = (state: MsgData[], msgAction: MsgAction ): MsgData[] => {
  if (msgAction.type === MsgActionType.addMsg) {
    return [...state, ...msgAction.msgs]
  }else if (msgAction.type === MsgActionType.setMsg) {
    return [...msgAction.msgs]
  }else if (msgAction.type === MsgActionType.removeMsg) {
    return [...state].splice(msgAction.index)
  }else if (msgAction.type === MsgActionType.clearMsg) {
    return []
  }
  return state
}

const useChat = (chatId: string) => {
  const [chatMsgs, changeChatMsgs] = useReducer(doChatMsgs, [] as MsgData[])
  const socketRef = useRef<Socket>()

  const handleSocketEvent = (socket: Socket) => {
    handleIncomingMsg(socket, changeChatMsgs)
  }

  const sendChatMsg = ( sendermsg: {sender: string, senderid: string, msg: string}) => {
    if (socketRef.current)
      emitSendChatMsg(socketRef.current, sendermsg)
  }

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || '')
    handleSocketEvent(socketRef.current)
    emitRequestAllMsg(socketRef.current)
    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  return { chatMsgs, changeChatMsgs, sendChatMsg }
}

export default useChat