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

export default function PieChart({ data }) {
  // Example of data you could pass in as prop
  const title = 'Mmmm pie'
  const width = 400
  const height = 400

  const getValues = () => Object.values(data)
  const getLabels = () => Object.keys(data)
  const getColors = (labels) =>
    labels.map((label) => {
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
          values: getValues(),
          labels: getLabels(),
        },
      ]}
      layout={{
        title: title,
        width: width,
        height: height,
        colorway: getColors(getLabels()),
      }}
      config={{ responsive: true, displaylogo: false }}
    />
  )
}
