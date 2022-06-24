import { MsgData } from './hook/useChat'

type MsgProps = {
  msg: MsgData,
  asAuthor?: boolean
}

const Msg = ({ msg, asAuthor }: MsgProps) => {
  const ALIGNCONST = 'rounded-full max-w-[25rem] p-3 w-fit break-words'
  if (asAuthor){
    return (
      <div className='self-end  p-1'>
        <div className={`bg-blue-500 place-self-end text-white ${ALIGNCONST}`} >
          {msg.content}
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
        {msg.content}
      </div>
    </div>
  )
}

export default Msg
