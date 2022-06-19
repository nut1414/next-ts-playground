import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import Head from 'next/head'
import Box from '../components/common/Box'
import ButtonBox from '../components/common/ButtonBox'
import Dummy from './dummy'
import SignButton from '../components/auth/SignButton'

const Home: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <div className='flex h-screen bg-neutral-900 text-white'>
      <Head>
        <title>nut1414&apos;s playground</title>
        <meta name="description" content="playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Dummy/>
      <div className="m-auto">

        <Box className="flex flex-col h-auto text-center items-center">
          <div className="text-3xl pb-2 border-b-2">
            nut1414&apos;s playground
          </div>
          <ButtonBox onClick={() => router.push('/editor')} activeColor="#777" className="flex flex-rol m-2 mt-6 w-[75%]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>  
            <div className='text-center flex-grow'>
              Editor.js Test
            </div>
          </ButtonBox>
          <ButtonBox onClick={() => router.push('/chat')} color="#000" activeColor="#777" className="flex flex-rol m-2 w-[75%] self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <div className='text-center flex-grow'>
              Chat App
            </div>
          </ButtonBox>
          <ButtonBox onClick={() => router.push('https://sioclient.pannanap.pw/')} color="#000" activeColor="#777" className="flex flex-rol m-2 w-[75%] self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
            </svg>
            <div className='text-center flex-grow'>
              Socket.io Client Tool
            </div>
          </ButtonBox>
          <ButtonBox color="#000" activeColor="#777" className="flex flex-rol m-2 w-[75%] self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className='text-center flex-grow'>
              Unknown Button
            </div>
          </ButtonBox>
          <SignButton session={session}/>
        </Box>
         {session && <div className='text-center mt-2'>Currently sign in as {session?.user?.name}</div>}
      </div>
    </div>
  )
}

export default Home
