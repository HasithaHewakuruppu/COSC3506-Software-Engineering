import useSWR from 'swr'
import { useState } from 'react'
import List from './List'
import { API_ENDPOINTS } from '../utils/routes'

function ListPage({ listURL }) {
  const [sortType, setSortType] = useState('Date')

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

  if (todos) {
    switch (sortType) {
      case 'Date':
        todos.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date)
        })
        break

      case 'Duration':
        todos.sort(function (a, b) {
          return a.duration - b.duration
        })
        break

      case 'Label':
        todos.sort(function (a, b) {
          return a.label.name.localeCompare(b.label.name)
        })
        break

      default:
        // Assuming the default case should sort by date
        todos.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date)
        })
        break
    }
  }

  return (
    <div>
      <List
        todos={todos}
        isTodoListLoading={isTodoListLoading}
        listURL={listURL}
        setSortType={setSortType}
      />
    </div>
  )
}

export default ListPage
