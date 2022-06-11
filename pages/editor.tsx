import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import ButtonBox from '../components/common/ButtonBox'
import useSWR from 'swr'
import Dummy from './dummy'
import { createReactEditorJS } from 'react-editor-js'
import dynamic from 'next/dynamic';
const ReactEditorJS = createReactEditorJS()

const fetcher = (url: string) => axios.get(url).then(res => res.data)

let MyEditor: any;
MyEditor = dynamic(() => import('../components/editor/MyEditor'),{ ssr: false, loading: () => <p>Loading Editor...</p>, });

const Editor: NextPage = () => {
  const router = useRouter()
  const editorCore = useRef(null)
  const [sData, setSaveData] = useState({})
  const { data, error } = useSWR('/api/editor/load',fetcher)

  const handleInitialize = useCallback(async (instance: any) => {
    editorCore.current = await instance
    const editCore: any = editorCore?.current
    console.log('actually found instance')
    console.log(editCore.render)
    if (editCore)
      editCore.render({
        time: 1635603431943,
        blocks: [
          {
            id: "12iM3lqzcm",
            type: "paragraph",
            data: {
              text:
                "fml"
            }
          }
        ]
      })
    
  }, [])
  
  const handleSave = async () => {
    const editCore: any = editorCore?.current
    console.log('saving to state')
    const savedData = await editCore?.save();
    console.log('saveddata: ' + JSON.stringify(savedData))
    setSaveData(savedData)
    
  }

  const handleSendSaveToDb = async () => {
    if (Object.keys(sData).length !== 0){
      console.log('sending data to save api')
      const datatodb =  await axios.post('/api/editor/save',sData)
      console.log('datatodb: ' + JSON.stringify(datatodb))
    }
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <div className='text-m text-center flex-grow hidden lg:block'>
            Return to main page
          </div>
        </ButtonBox>
        
        <div className="flex flex-grow justify-end pr-4 align-middle self-center bold text-2xl">
          React-Editor-js Test
        </div>
        <ButtonBox onClick={() => handleSendSaveToDb()} color="#fff" textColor="#000" activeColor="#777" className="flex flex-rol flex-grow-0 p-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
            <div className='text-m text-center flex-grow hidden lg:block'>
              Save
            </div>
        </ButtonBox>
      </div>
      <div className="flex flex-row ">
        <div className=" w-[50%] h-[95vh] p-3 text-white overflow-y-scroll">
          {JSON.stringify(sData)}
        </div>
        <div className="bg-white w-[50%] h-[95vh] p-3 break-words drop-shadow-md text-black overflow-auto">
          {(MyEditor ? (data ? <MyEditor defaultValue={data} onChange={handleSave} handleInitialize={handleInitialize}/> : <>Loading data...</>) : <>Loading Editor...</>)}
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default Editor