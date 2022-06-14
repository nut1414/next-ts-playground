import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic';

const Output: any = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

const ContentPage: NextPage = () => {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('/api/editor/load').then((newdata: any)=>{
      setData(newdata.data)
    })
  },[])
  return (
    <>
    <Output data={data}/>
    </>
  )
}

export default ContentPage