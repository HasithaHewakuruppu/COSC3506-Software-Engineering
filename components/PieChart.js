import { colorOfCategory } from '../utils/colors'
import dynamic from 'next/dynamic'
// A known bug requires loading plotly dynamically in next
const Plot = dynamic(
  () => {
    return import('react-plotly.js')
  },
  { ssr: false }
)

export default function PieChart({ data, title, width }) {
  const labels = Object.keys(data).sort()
  const values = labels.map((label) => data[label])
  const colors = labels.map((label) => colorOfCategory(label))

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: values,
          labels: labels.map(
            (label) =>
              label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
          ),
          marker: { colors },
        },
      ]}
      layout={{
        title,
        width,
      }}
      config={{ responsive: true, displaylogo: false }}
    />
  )
}
