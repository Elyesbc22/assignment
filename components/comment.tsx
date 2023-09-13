import { signIn, signOut, useSession } from "next-auth/react"

type CommentFormProps = {
  text: string
  setText: Function
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export default function CommentSection({
  text,
  setText,
  onSubmit,
}: CommentFormProps) {
  const session = useSession()

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500"
        rows={2}
        placeholder={
          session.data
            ? `What are your thoughts?`
            : 'Please login to leave a comment'
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!session.data}
      />

      <div className="flex items-center mt-4">
        {session.data ? (
          <div className="flex items-center space-x-6">
            <button className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700">
              Send
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
            onClick={() => signIn()}
          >
            Log In
          </button>
        )}
      </div>
    </form>
  )
}