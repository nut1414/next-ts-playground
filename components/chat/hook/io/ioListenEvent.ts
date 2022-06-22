import React from 'react'
import { Socket } from 'socket.io-client'
import { MsgAction, MsgActionType } from '../useChat'

export const handleIncomingMsg = (socket: Socket, changeChatMsgs: React.Dispatch<MsgAction>) => {
  socket.on('chat', (msgs) => {
    changeChatMsgs({type: MsgActionType.addMsg, msgs})
  })
}