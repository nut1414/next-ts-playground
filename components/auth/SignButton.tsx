import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import ButtonBox from '../common/ButtonBox'

const SignButton = ({ session }: { session?: Session  }) => {
  if (session){
    return (
      <ButtonBox onClick={() => signOut()} color="#e00" activeColor="#777" className="flex flex-rol m-2 w-[75%] self-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <div className='text-center flex-grow'>
        Sign out
        </div>
      </ButtonBox>
    )
  }
  return (
    <ButtonBox onClick={() => signIn()} color="#0e0" activeColor="#777" className="flex flex-rol m-2 w-[75%] self-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 self-center" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <div className='text-center flex-grow'>
      Sign in
      </div>
    </ButtonBox>
  )
}

export default SignButton