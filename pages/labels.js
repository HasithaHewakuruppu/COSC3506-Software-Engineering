import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HOME_PAGE, LOGIN_PAGE } from '../utils/routes'
import Spinner from '../components/Spinner'
import { prisma } from '../lib/db'
import { getSession } from 'next-auth/react'

export default function RestrictedPage({ session, alreadyHasLabels }) {
  const router = useRouter()
  useEffect(() => {
    if (!session) {
      router.push(LOGIN_PAGE)
    }
    if (session && alreadyHasLabels) {
      router.push(HOME_PAGE)
    }
  }, [])

  if (!session || alreadyHasLabels) {
    return <Spinner fullPageSpinner />
  }

  return (
    <div>
      <h1>Let&apos;s create your labels...</h1>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  let labels = []
  if (session?.user?.email) {
    labels = await prisma.label.findMany({
      where: {
        userEmail: session?.user?.email,
      },
    })
  }
  return {
    props: {
      session: session ? session : null,
      alreadyHasLabels: labels?.length > 0,
    },
  }
}
