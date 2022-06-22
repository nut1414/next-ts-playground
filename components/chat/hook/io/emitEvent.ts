import { Socket } from 'socket.io-client'
import { MsgData } from '../../Msg'

// TODO: Make 'sender' depend on the server response
// request sender-senderid map -> attach sender on to msg -> render

interface SenderMsg {
  sender: string
  senderId: string
  data: string
}

export const emitSendChatMsg = (socket: Socket, sendmsg: SenderMsg) => {
  socket.emit('chat:addmsg', sendmsg)
}

export const emitRequestAllMsg = (socket: Socket) => {
  socket.emit('chat:getall')
}

export const emitJoinRoom = (socket: Socket, roomId: string) => {
  socket.emit('join', roomId)
}