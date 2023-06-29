import List from '../../components/List'
import useSWR from 'swr'
import { API_ENDPOINTS } from '../../utils/routes'

const ListPage = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const {
    data: items,
    error,
    mutate: mutateListForToday,
  } = useSWR(API_ENDPOINTS.GET_TODOS_FOR_TODAY, fetcher)

  if (error) {
    console.error('Error fetching todos:', error)
  }

  return (
    <div>
      <List items={items} mutateListForToday={mutateListForToday} />
    </div>
  )
}

export default ListPage
