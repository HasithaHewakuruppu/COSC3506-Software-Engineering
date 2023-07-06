import useSWR from 'swr'
import List from '../../components/List'
import { API_ENDPOINTS } from '../../utils/routes'

function ListPage({ listURL }) {
  const fetcher = async function (url) {
    return fetch(url).then((res) => res.json())
  }

  const url = listURL ? listURL : API_ENDPOINTS.GET_TODOS_WITH_LABELS // by default will grab all todos

  const {
    data: todos,
    error,
    isLoading: isTodoListLoading,
  } = useSWR(url, fetcher)

  if (error) {
    console.error('Error fetching todos:', error)
  }

  // this is where the sorting happens.......
  // this is where the other sorting based on label and duration should also happen
  if (todos) {
    todos.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  }

  console.log('todos:', todos)

  return (
    <div>
      <List
        todos={todos}
        isTodoListLoading={isTodoListLoading}
        listURL={listURL}
      />
    </div>
  )
}

export default ListPage
