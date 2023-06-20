import dynamic from 'next/dynamic';
// A known bug requires loading plotly dynamically in next
const Plot = dynamic(() => { return import("react-plotly.js") }, { ssr: false })

export default function PieChart() {
    return (
        <>Placeholder</>
    )
}