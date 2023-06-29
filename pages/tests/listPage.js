import List from '../../components/List'
import useSWR from 'swr'
import formatDate from '../../utils/formatDate'
import { API_ENDPOINTS } from '../../utils/routes'

function ListPage({ listDate }) {
  const fetcher = async function (url) {
    return fetch(url).then((res) => res.json())
  }

  const url = listDate
    ? API_ENDPOINTS.GET_TODOS_FOR_DATE + `${formatDate(listDate)}`
    : API_ENDPOINTS.GET_TODOS_WITH_LABELS

  const { data: items, error } = useSWR(url, fetcher)

  if (error) {
    console.error('Error fetching todos:', error)
  }

  if (items) {
    items.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  }

  return (
    <div>
      <List items={items} />
    </div>
  )
}

export default ListPage
