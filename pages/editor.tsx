import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Box from '../components/common/Box'
import ButtonBox from '../components/common/ButtonBox'
import Dummy from './dummy'
import { createReactEditorJS } from 'react-editor-js'
import dynamic from 'next/dynamic';
const ReactEditorJS = createReactEditorJS()

let MyEditor: any;
MyEditor = dynamic(() => import('../components/common/MyEditor'),{ ssr: false, loading: () => <p>Loading ...</p>, });


const Editor: NextPage = () => {
  const router = useRouter()
  const editorCore = useRef(null)
  const [s,ss] = useState(false)
  const [sData, setSaveData] = useState({})
  useEffect(() => {
    ss(true)
  }, [])

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance
    console.log('actually instance')
    console.log(editorCore.current)
  }, [])
  
  const handleSave = async () => {
    const editCore: any = editorCore?.current
    const savedData = editCore?.save();
    savedData.then((data: any)=>{
      console.log(data)
      setSaveData(data)
    })
    
    
    console.log('saved bruh')
  }

  return (
  <div className='h-screen bg-neutral-900 text-white overflow-hidden'>
    <Head>
      <title>Editor Test</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <div className="m-auto">
      <div className="flex flex-row bg-black text-white">
        <ButtonBox onClick={() => router.replace('/')} color="#fff" textColor="#000" activeColor="#777" className="flex flex-rol flex-grow-0 p-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7  mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <div className='text-m text-center flex-grow hidden lg:block'>
            Return to main page
          </div>
        </ButtonBox>
        <div className="flex flex-grow justify-end pr-4 align-middle self-center bold text-2xl">
          React-Editor-js Test
        </div>
        
      </div>
      <div className="flex flex-row ">
        <div className=" w-[50%] p-3 text-white">
          {JSON.stringify(sData)}
        </div>
        <div className="bg-white w-[50%] h-screen p-3 break-words drop-shadow-md text-black">
          {(MyEditor ? <MyEditor onChange={handleSave} handleInitialize={handleInitialize}/> : <></>)}
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default Editor