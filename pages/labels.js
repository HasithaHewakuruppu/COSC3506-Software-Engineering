import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HOME_PAGE, LOGIN_PAGE } from '../utils/routes'
import { useSession } from 'next-auth/react'
import Spinner from '../components/Spinner'
import useSwr from 'swr'
import { fetcher } from '../lib/fetcher'

export default function RestrictedPage() {
  const router = useRouter()
  const { status } = useSession()
  const { data: categories, isLoading: isLoadingCategories } = useSwr(
    '/api/labels',
    fetcher
  )

  console.log(categories)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(LOGIN_PAGE)
    } else if (status === 'authenticated' && categories?.length > 0) {
      router.push(HOME_PAGE)
    }
  }, [status, router, isLoadingCategories])

  if (status === 'loading' || isLoadingCategories) {
    return <Spinner fullPageSpinner />
  }

  return (
    <div>
      <h1>Set up your labels...</h1>
    </div>
  )
}
