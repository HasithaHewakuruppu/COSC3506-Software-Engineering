import { getSession } from 'next-auth/react'

export default async function SessionUser(context) {
  const session = await getSession(context)

  if (!session) {
    return null
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
  }

  return user
}
