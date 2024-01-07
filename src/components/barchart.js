import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const Barchart = ({ chartData }) => {
    return (
        <div className='bar-graph'>
            <Bar data={chartData} options={{ 
                    maintainAspectRatio: false, 
                    responsive: true,
                    // Set width and height here
                    width: 400,
                    height: 200
                }}/>
        </div>
            
        
    )
}

export default Barchart;