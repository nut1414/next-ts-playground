import Modal from '../common/Modal'
import ButtonBox from '../common/ButtonBox'
import Box from '../common/Box'
import React, { useReducer, useRef } from 'react'
import { useRouter } from 'next/router'

type RoomModalProps = {
  chatID: string,
  setChatID: React.Dispatch<React.SetStateAction<string>>,
  toggle: React.DispatchWithoutAction
}


const RoomModal = ({chatID, setChatID, toggle}: RoomModalProps) => {
  const idBoxRef = useRef<HTMLInputElement>(null)
  
  const router = useRouter()
  const handleClose = () => {
    if (chatID){
      toggle()
    } else{
      router.push('/')
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (idBoxRef.current?.value){
      setChatID(idBoxRef.current.value)
      toggle()
    }
  }

  return (
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
  )
}

export default RoomModal
