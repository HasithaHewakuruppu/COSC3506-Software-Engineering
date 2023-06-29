import List from '../../components/List'
import useSWR from 'swr'
import formatDate from '../../utils/formatDate'
import { API_ENDPOINTS } from '../../utils/routes'

function ListPage({ listDate }) {
  const fetcher = async function (url) {
    return fetch(url).then((res) => res.json())
  }

  const url = API_ENDPOINTS.GET_TODOS_FOR_DATE + `${formatDate(listDate)}`

  const { data: items, error } = useSWR(url, fetcher)

  if (error) {
    console.error('Error fetching todos:', error)
  }

  return (
    <div>
      <List items={items} date={listDate} />
    </div>
  )
}

export default ListPage
