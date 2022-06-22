import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import LoginPage from '../../components/auth/LoginPage'
import SignButton from '../../components/auth/SignButton'
import ChatBox from '../../components/chat/ChatBox'
import RoomModal from '../../components/chat/RoomModal'
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
  const [ chatID, setChatID ] = useState('')
  const [ isAsking, toggleAsk ] = useReducer((s: boolean) => chatID ? !s : true, true)
  const { roomid } = router.query
  useEffect(()=>{
    if (roomid){
      setChatID(roomid as string)
      toggleAsk()
    }
  },[roomid])
  if (session){
    return (
      <div className='bg-black'>
        <ChatHead/>

        <div className="flex flex-row bg-black text-white max-h-screen">
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
        
        <div className="flex text-white m-auto ">
          { chatID && 
            <ChatBox chatID={chatID} currentDisplayName={session.user?.name || ''} currentUser={Buffer.from(session.user?.email || '').toString('base64')}/>}
        </div>
        { isAsking &&
          <RoomModal chatID={chatID} setChatID={setChatID} toggle={toggleAsk}/>
        }
      </div>
    )
  }
  return (
    <LoginPage session={session}/>
  )
}

export default Chat