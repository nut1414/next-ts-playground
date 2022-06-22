export interface MsgData {
  _id: string
  sender: string
  senderId: string
  data: string
}

type MsgProps = {
  msg: MsgData,
  asAuthor?: boolean
}

const Msg = ({ msg, asAuthor }: MsgProps) => {
  const ALIGNCONST = 'rounded-full max-w-[25rem] p-3 w-fit break-words'
  if (asAuthor){
    return (
      <div className='flex flex-col place-self-end p-1'>
        <div className={`place-self-end bg-blue-500 text-white ${ALIGNCONST}`} >
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

export default Msg