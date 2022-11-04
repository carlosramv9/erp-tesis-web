import React from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = ({title, dataValues}) => {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
          {
            label: '# de Clientes',
            data: dataValues,
            fill: true,
            backgroundColor: 'rgba(34,40,49,.2)',
            borderColor: 'rgba(34,40,49,.7)'
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <div>
            <div className='header'>
                <h1 className='title'>{title}</h1>
            </div>
            <Line data={data} options={options} height={50} width={100}/>
        </div>
    )
}

export default LineChart
