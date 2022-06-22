import { useRouter } from 'next/router'
import Box from '../common/Box'
import SignButton from './SignButton'
import ButtonBox from '../common/ButtonBox'
import { Session } from 'next-auth'

type LoginPageProps = {
  session?: Session | null
};

const LoginPage = ({ session }: LoginPageProps) => {
  const router = useRouter()
  return (
    <div className="flex h-screen bg-black">
      <Box className="m-auto flex flex-col ">
        <div className="text-center font-bold pb-5 text-2xl">
          Please Sign in
        </div>
        <SignButton session={session} />
        <ButtonBox
          onClick={() => router.push('/')}
          activeColor="#777"
          className="flex flex-rol m-2 mt-6 w-[75%] self-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 self-center"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-center flex-grow">Return to main page</div>
        </ButtonBox>
      </Box>
    </div>
  )
}

export default LoginPage
