import dynamic from 'next/dynamic';
// A known bug requires loading plotly dynamically in next
const Plot = dynamic(() => { return import("react-plotly.js") }, { ssr: false })

export default function PieChart() {

    // Example of data you could pass in as prop
    const title = "Mmmm pie"
    const width = 400
    const height = 400
    const data = {
        Work: 20,
        Fitness: 60,
        Leisure: 20,
    }

    const getValues = () => Object.values(data);
    const getLabels = () => Object.keys(data);

    return (
        <Plot
            data={[{
                type: 'pie',
                values: getValues(),
                labels: getLabels(),
            }
            ]}
            layout={{ title: title, width: width, height: height }}
            config={{ responsive: true, displaylogo: false }}
        />
    );
}