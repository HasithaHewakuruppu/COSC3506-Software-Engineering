import categories from '../utils/categories'
import { LEISURE_COLOR, WORK_COLOR, FITNESS_COLOR } from '../utils/colors'
import dynamic from 'next/dynamic'
// A known bug requires loading plotly dynamically in next
const Plot = dynamic(
  () => {
    return import('react-plotly.js')
  },
  { ssr: false }
)

export default function PieChart({ data, width }) {
  const labels = Object.keys(data).sort()
  const values = labels.map((label) => data[label])
  const colors = labels.map((label) => {
    if (label === categories.FITNESS) return FITNESS_COLOR
    else if (label === categories.WORK) return WORK_COLOR
    else if (label === categories.LEISURE) return LEISURE_COLOR
    else return '#0000'
  })

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: values,
          labels: labels,
          marker: { colors },
        },
      ]}
      layout={{
        width: width,
      }}
      config={{ responsive: true, displaylogo: false }}
    />
  )
}
