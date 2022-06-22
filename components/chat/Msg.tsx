export interface MsgData {
  id: string
  sender: string
  senderID: string
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
      <div className='place-self-end'>
        <div className='text-right text-lg'>
          {msg.sender}
        </div>
        <div className={`bg-blue-500 text-white ${ALIGNCONST}`} >
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