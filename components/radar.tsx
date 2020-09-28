import React from 'react';
import {Radar} from 'react-chartjs-2';

const data = {
  labels: ['😁', '😡', '😥', '😐', '😮'],
  datasets: [
    {
      label: 'Player 1',
      backgroundColor: 'rgba(66, 245, 87,0.2)',
      borderColor: 'rgba(66, 245, 87,1)',
      borderWidth: 5,
      pointBackgroundColor: 'rgba(155,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      pointRadius: 0,
      data: [70, 50, 70, 80, 50]
    },
    {
      label: 'Player 2',
      backgroundColor: 'rgba(247, 52, 120,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 5,
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      pointRadius: 0,
      data: [30, 50, 40, 50, 80,]
    },
    {
      label: 'Average',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      borderWidth: 5,
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      pointRadius: 0,
      data: [60, 60, 60, 60, 60,]
    }
  ]
};

const options={
    scale: {
        scaleLabel: {
            fontSize: 100
        },
        angleLines: {
            display: true
        },
        gridLines: {
            circular: false,
            display: false
        },
        ticks: {
            display: false,
            suggestedMin: 0,
            suggestedMax: 100
        }
    }
}
const RadarChart = () => (
  <div>
    <h2>Radar Example</h2>
    <Radar
        data={data}
        width={200}
        height={200}
        options={options}
    />
  </div>
);
export default RadarChart