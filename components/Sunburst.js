import { colorOfCategory } from '../utils/colors'
import dynamic from 'next/dynamic'
// A known bug requires loading plotly dynamically in next
const Plot = dynamic(
  () => {
    return import('react-plotly.js')
  },
  { ssr: false }
)

export default function Sunburst({ data, title, width }) {
  let labels = []
  let parents = []
  let values = []
  let colors = []

  for (let category of Object.keys(data)) {
    labels = [...labels, category]
    values = [
      ...values,
      Object.values(data[category]).reduce((a, b) => a + b, 0),
    ]
    parents = [...parents, '']
    colors = [...colors, colorOfCategory(category)]

    for (let subcategory of Object.keys(data[category])) {
      labels = [...labels, subcategory]
      values = [...values, data[category][subcategory]]
      parents = [...parents, category]
      colors = [...colors, colorOfCategory(category)]
    }
  }

  return (
    <Plot
      data={[
        {
          type: 'sunburst',
          labels: labels.map(
            (label) =>
              label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
          ),
          parents: parents.map(
            (parents) =>
              parents.charAt(0).toUpperCase() + parents.slice(1).toLowerCase()
          ),
          values: values,
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
