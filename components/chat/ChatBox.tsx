import { STATES } from 'mongoose'
import React, { useEffect, useReducer, useRef } from 'react'
import { io } from 'socket.io-client'

interface SingleMsg {
  id: string
  sender: string
  senderID: string
  data: string
}

const testmsgs: Array<SingleMsg> = [
  {id:'test1',sender:'tester1',senderID:'123123',data:'Never gonna give you up'},
  {id:'test2',sender:'tester2',senderID:'456456',data:'Never gonna let you down'},
  {id:'test3',sender:'tester1',senderID:'123123',data:'Never gonna run around and desert you'},
  {id:'test4',sender:'tester2',senderID:'456456',data:'Never gonna make you cry'},
  {id:'test5',sender:'tester1',senderID:'123123',data:'Never gonna say goodbye'},
  {id:'test6',sender:'tester2',senderID:'456456',data:'Never gonna tell a lie and hurt you'},
  {id:'test7',sender:'tester1',senderID:'123123',data:"We've known each other for so long"},
  {id:'test8',sender:'tester2',senderID:'456456',data:"Your heart's been aching, but you're too shy to say it"},
  {id:'test9',sender:'tester1',senderID:'123123',data:"Inside, we both know what's been going on"},
  {id:'test10',sender:'tester2',senderID:'456456',data:"We know the game and we're gonna play it"},
]

type MsgProps = {
  msg: SingleMsg,
  asAuthor?: boolean
}


const Msg = ({ msg, asAuthor }: MsgProps) => {
  const ALIGNCONST = "rounded-full max-w-[25rem] p-3 w-fit break-words"
  if (asAuthor){
    return (
      <div className='place-self-end'>
        <div className='text-right text-lg'>
          {msg.sender}
        </div>
        <div className={`bg-blue-500 text-white ${ALIGNCONST}`} >
          {msg.data}
        </div>
      </div>
    )
  }
  return (
    <div className='place-self-start'>
      <div className='text-left text-lg'>
        {msg.sender}
      </div>
      <div className={`bg-slate-500 text-white ${ALIGNCONST}`}>
        {msg.data}
      </div>
    </div>
  )
}

type ChatBoxProps = {
  children?: React.ReactNode
  chatID: string,
  currentUser: string,
}

const ChatBox = ({ chatID, currentUser }: ChatBoxProps) => {
  const [chatMsgs, addChatMsgs] = useReducer((state: Array<SingleMsg>,item: SingleMsg) => { return [...state, item] as Array<SingleMsg>}, [] as Array<SingleMsg>)
  const textBoxRef = useRef<HTMLInputElement>(null)
  let id = 0
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addChatMsgs({id:String(id++),sender:'tester1',senderID:currentUser,data:textBoxRef.current?.value || ''})
    if (textBoxRef.current?.value){
      textBoxRef.current.value = ''
    }
    
  }

  useEffect(() => {
    if(chatMsgs.length === 0)
      testmsgs.forEach((msg) => {addChatMsgs(msg)})
  },[])

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col overflow-y-scroll h-full max-h-[48rem] min-w-[50rem] my-2 px-4 ">
        {chatMsgs.map((singlemsg) => {
          if (singlemsg.senderID === currentUser)
            return <Msg key={singlemsg.id} msg={singlemsg} asAuthor={true}/>
          else
            return <Msg key={singlemsg.id} msg={singlemsg}/>
        })}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-row">
        <input ref={textBoxRef} type="text" className="drop-shadow rounded-full w-full ring p-1 mx-2 ring-slate-300 "/>
        <button className='bg-blue-500 text-white p-3 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
    
  )
}

export default ChatBox