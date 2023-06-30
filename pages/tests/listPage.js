import { isToday as isTodayDateFns } from 'date-fns'
import useSWR from 'swr'
import List from '../../components/List'
import formatDate from '../../utils/formatDate'
import { API_ENDPOINTS } from '../../utils/routes'

function ListPage({ listDate }) {
  const fetcher = async function (url) {
    return fetch(url).then((res) => res.json())
  }

  const url = listDate
    ? API_ENDPOINTS.GET_TODOS_FOR_DATE + `${formatDate(listDate)}`
    : API_ENDPOINTS.GET_TODOS_WITH_LABELS // by default will grab all todos

  const isToday = isTodayDateFns(listDate)

  const {
    data: todos,
    error,
    isLoading: isTodoListLoading,
  } = useSWR(url, fetcher)

  if (error) {
    console.error('Error fetching todos:', error)
  }

  if (todos) {
    todos.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  }

  return (
    <div>
      <List
        todos={todos}
        isTodoListLoading={isTodoListLoading}
        isToday={isToday}
        listDate={listDate}
      />
    </div>
  )
}

export default ListPage
