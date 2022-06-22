import React from 'react'
import { Socket } from 'socket.io-client'
import { ChatConnectionStatus, MsgAction, MsgActionType } from '../useChat'



export const handleConnect = (socket: Socket, setConnectStatus: React.Dispatch<ChatConnectionStatus>) => {
  socket.on('connect', () => {
    setConnectStatus(ChatConnectionStatus.CONNECTED)
  })
}

export const handleConnectError = (socket: Socket, setConnectStatus: React.Dispatch<ChatConnectionStatus>) => {
  socket.on('connect_error', () => {
    setConnectStatus(ChatConnectionStatus.ERROR)
  })
}


export const handleIncomingMsg = (socket: Socket, changeChatMsgs: React.Dispatch<MsgAction>) => {
  socket.on('chat:msgs', (msgs) => {
    console.log(msgs)
    changeChatMsgs({type: MsgActionType.ADD, msgs})
  })
}

export const handleJoinRoom = (socket: Socket, setConnectStatus: React.Dispatch<ChatConnectionStatus>) => {
  socket.on('join:success', (msgs) => {
    setConnectStatus(ChatConnectionStatus.JOINED)
  })
  socket.on('join:failed', (msgs) => {
    setConnectStatus(ChatConnectionStatus.ERROR)
  })
}
