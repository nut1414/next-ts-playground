import { Socket } from 'socket.io-client'
import { OutboundMsgData } from '../useChat'

// TODO: Make 'sender' depend on the server response
// request sender-senderid map -> attach sender on to msg -> render

export const emitSendChatMsg = (socket: Socket, sendmsg: OutboundMsgData) => {
  socket.emit('chat:addmsg', sendmsg)
}

export const emitRequestAllMsg = (socket: Socket) => {
  socket.emit('chat:getall')
}

export const emitJoinRoom = (socket: Socket, roomId: string) => {
  socket.emit('join', roomId)
}