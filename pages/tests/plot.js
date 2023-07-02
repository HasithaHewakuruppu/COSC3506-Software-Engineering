// Dummy file for testing plotly things
import PieChart from '../../components/PieChart'
import { fetcher } from '../../lib/fetcher'
import { API_ENDPOINTS } from '../../utils/routes'
import useSWR from 'swr'
import TodoStats from '../../lib/TodoStats'

export default function TestPlot() {
  const { data, error } = useSWR(
    API_ENDPOINTS.GET_TODOS_WITH_LABELS,
    (...args) =>
      fetcher(...args).then((todos) =>
        new TodoStats(todos).getDurationsByUpperCategory()
      )
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return <PieChart data={data} />
}
