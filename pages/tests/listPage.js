import React, { useEffect, useState } from 'react'
import List from '../../components/List'
import useSWR from 'swr'

const ListPage = () => {
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}-${month}-${year}`
  }

  const currentDate = new Date()
  const formattedDate = formatDate(currentDate)
  const apiUrl = `http://localhost:3000/api/todos?labels=true&date=${formattedDate}`

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data: items, error, isLoading } = useSWR(apiUrl, fetcher)

  if (error) {
    console.error('Error fetching labels:', error)
  }

  return (
    <div>
      <List items={items} />
    </div>
  )
}

export default ListPage
