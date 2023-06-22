import { getSession } from 'next-auth/react'

export default function RestrictedPage({ session }) {
  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // :)
    }
    return null
  }

  return (
    <div>
      <h1>Current User Details</h1>
      <p>User Name: {session.user.name}</p>
      <p>User Email: {session.user.email}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session: session ? session : null,
    },
  }
}
