import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {  GetServerSideProps } from 'next'
import Output from 'editorjs-react-renderer'
import dbConnect from '../../utils/db'
import PageState, { IPageState } from '../../models/PageState'

const options =  {
  upsert: true,
  new: true,
  setDefaultsOnInsert: true
}

export const getServerSideProps: GetServerSideProps = async () => {
  dbConnect()
  console.log('server-side loaded data')
  const state: IPageState = await PageState.findOne().lean() || await PageState.findOneAndUpdate({},{
    time: 1635603431943,
    blocks: [
      {
        id: "12iM3lqzcm",
        type: "paragraph",
        data: {
          text:
            "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
        }
      }
    ]
  },options).lean() || { version: '', blocks: [], time: new Date().getTime() }
  console.log(state)
  const data = JSON.stringify(state)
  return { props: {data} }
}


const ContentPage: NextPage = ({ data }: any) => {
  const [state, setState] = useState({
    time: 0,
    blocks: [],
    version: "0"
  } as any)
  useEffect(() => {
    console.log(data)
    setState(JSON.parse(data))
  },[data])
  return (
    <div>
      <Output data={state}/>
    </div>
  )
}

export default ContentPage