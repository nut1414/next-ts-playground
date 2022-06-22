import Msg, { MsgData } from './Msg'
import React, { useEffect, useRef } from 'react'
import useChat, { ChatConnectionStatus, MsgActionType } from './hook/useChat'

const testmsgs: MsgData[] = [
  {_id:'test1',sender:'tester1',senderId:'123123',data:'Never gonna give you up'},
  {_id:'test2',sender:'tester2',senderId:'456456',data:'Never gonna let you down'},
  {_id:'test3',sender:'tester1',senderId:'123123',data:'Never gonna run around and desert you'},
  {_id:'test4',sender:'tester2',senderId:'456456',data:'Never gonna make you cry'},
  {_id:'test5',sender:'tester1',senderId:'123123',data:'Never gonna say goodbye'},
  {_id:'test6',sender:'tester2',senderId:'456456',data:'Never gonna tell a lie and hurt you'},
  {_id:'test7',sender:'tester1',senderId:'123123',data:'We\'ve known each other for so long'},
  {_id:'test8',sender:'tester2',senderId:'456456',data:'Your heart\'s been aching, but you\'re too shy to say it'},
  {_id:'test9',sender:'tester1',senderId:'123123',data:'Inside, we both know what\'s been going on'},
  {_id:'test10',sender:'tester2',senderId:'456456',data:'We know the game and we\'re gonna play it'},
]

type ChatBoxProps = {
  children?: React.ReactNode
  chatID: string,
  currentUser: string,
  currentDisplayName: string
}

const ChatBox = ({ chatID, currentUser, currentDisplayName }: ChatBoxProps) => {
  const { chatMsgs, changeChatMsgs, connectionStatus, sendChatMsg } = useChat(chatID)
  const textBoxRef = useRef<HTMLInputElement>(null)
  const chatHoldref = useRef<HTMLDivElement>(null)

  // temp id
  let id = 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // temp until socket implemented
    
    if (textBoxRef.current?.value){
      sendChatMsg(currentDisplayName,currentUser,textBoxRef.current.value)
      textBoxRef.current.value = ''
    }
  }

  /*
  useEffect(() => {
    if(chatMsgs.length === 0)
      changeChatMsgs({type: MsgActionType.SET, msgs: testmsgs})
  },[])*/

  useEffect(() => {
    if (chatHoldref.current)
      chatHoldref.current.scrollTop = chatHoldref.current.scrollHeight
  },[chatMsgs])

  return (
    
    <div className='grow bg-white text-black'>
      
      { connectionStatus === ChatConnectionStatus.CONNECTING && <div className='text-center text-xl p-2'>Connecting...</div>}
      { connectionStatus === ChatConnectionStatus.ERROR && <div className='text-center text-xl p-2'>Connection Error. Please wait or reload the page. (The server might be down?)</div>}
      { connectionStatus === ChatConnectionStatus.JOINED && 
      <div className='flex flex-col max-h-[95vh]'>
        <div className='self-center text-xl p-2 text-slate-400'>Connected</div>
        <div ref={chatHoldref} className="flex flex-col grow overflow-y-scroll h-screen min-w-screen my-2 px-4 ">
          {chatMsgs.map((singlemsg) => {
            if (singlemsg.senderId === currentUser)
              return <Msg key={singlemsg._id} msg={singlemsg} asAuthor={true}/>
            else
              return <Msg key={singlemsg._id} msg={singlemsg}/>
          })}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-row p-2 bg-neutral-200 justify-end">
          <input ref={textBoxRef} type="text" className="drop-shadow rounded-full w-full ring p-1 mx-2 ring-slate-300 "/>
          <button className='bg-blue-500 text-white p-3 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        
      </div>
      }
    </div>
    
  )
}

export default ChatBox