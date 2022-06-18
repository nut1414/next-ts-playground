import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useReducer, useRef, useState } from 'react'
import SignButton from '../../components/auth/SignButton'
import ChatBox from '../../components/chat/ChatBox'
import Box from '../../components/common/Box'
import ButtonBox from '../../components/common/ButtonBox'
import Modal from '../../components/common/Modal'

const ChatHead = () => {
  return (
    <Head>
      <title>Chat App</title>
      <meta name="description" content="Chat App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

const Chat: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const idBoxRef = useRef<HTMLInputElement>(null)
  const [ chatID, setChatID ] = useState('')
  const [ isAsking, toggleAsk ] = useReducer((s) => chatID ? !s : true, true)

  const handleClose = () => {
    if (chatID){
      toggleAsk()
    } else{
      router.push('/')
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (idBoxRef.current?.value){
      setChatID(idBoxRef.current.value)
      toggleAsk()
    }
  }

  if (session){
    return (
      <div className='bg-black h-screen'>
        <ChatHead/>

        <div className="flex flex-row bg-black text-white">
          <ButtonBox onClick={() => router.replace('/')} color="#fff" textColor="#000" activeColor="#777" className="flex flex-rol flex-grow-0 p-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <div className="text-m text-center flex-grow hidden lg:block">
              Return to main page
            </div>
          </ButtonBox>
          { chatID && 
           <div className="flex flex-grow justify-end pr-4 align-middle self-center bold text-2xl select-none">
           Room: {chatID}
           </div>
          }
          <div className="flex flex-grow justify-end pr-4 align-middle self-center bold text-2xl select-none">
              Chat
          </div>
          
        </div>
        
        <div className="flex text-white m-auto overflow-y-clip">
          
          {chatID && <Box>
            <ChatBox chatID={chatID} currentUser="123123"/>
          </Box>}
        </div>
        { isAsking &&
            <Modal>
              <Box className="mx-auto flex flex-col min-w-[24rem] align-middle my-auto ">
                <div className="text-right">
                  <ButtonBox onClick={handleClose} color='#e00' className="p-2 max-w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </ButtonBox>
                </div>
                <div className="text-center font-bold text-2xl pb-5 select-none">Enter Chat Channel ID</div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <input ref={idBoxRef} required autoFocus placeholder="chat id" type="text" className="drop-shadow ring-1 p-2 mb-10 text-center rounded ring-slate-300 m-4"/>
                  <ButtonBox className="mb-2">Save</ButtonBox>
                </form>
              </Box>
            </Modal>
          }
      </div>
    )
  }
  return (
    <div className='flex h-screen bg-black'>
      <ChatHead/>
      <Box className='m-auto flex flex-col w-[15%] '>
        <div className='text-center font-bold pb-5 text-2xl'>Please Sign in</div>
        <SignButton session={session}/>
        <ButtonBox onClick={() => router.push('/')} activeColor="#777" className="flex flex-rol m-2 mt-6 w-[75%] self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>  
            <div className='text-center flex-grow'>
              Return to main page
            </div>
          </ButtonBox>
      </Box>
    </div>
  )
}

export default Chat