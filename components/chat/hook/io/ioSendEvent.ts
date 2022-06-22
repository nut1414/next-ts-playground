import { Socket } from 'socket.io-client'
import { MsgData } from '../../Msg'

// TODO: Make 'sender' depend on the server response
// request sender-senderid map -> attach sender on to msg -> render

interface SenderMsg {
  sender: string
  senderid: string
  msg: string
}

export const emitSendChatMsg = (socket: Socket, sendmsg: SenderMsg) => {
  // TODO
}

export const emitRequestAllMsg = (socket: Socket) => {
  // TODO
  socket.emit('chat.getallmsg')
}