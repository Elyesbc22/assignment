import { CMS_NAME } from '../lib/constants'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Intro = () => {
  const session = useSession()
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Risklick Blog.
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        {!session.data ?
          <button onClick={() => signIn()} className="hover:underline">
            Sign In
          </button> :
          <div>
            <button onClick={() => signIn()} className="hover:underline">
              Sign Out
            </button>
              <br/> Signed In as {session.data.user.name}
          </div>
        }
        <br></br>
      </h2>

    </section>
  )
}

export default Intro
