import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

export const BarGraph = (props) => {
  const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70])

  const incomingData = {
    display: true,
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: '# of km ran',
      barPercentage: 0.5,
      barThickness: 20,
      borderWidth: 1,
      backgroundColor: '#90e0ef',
      minBarLength: 1,
      data: data,
    }]
  }

  const options = {
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          beginAtZero: true,
        }
      }],
      xAxes: [{
        display: true,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    },
    legend: {
      display: false
    },
  }


  return (
    <Bar
      data={incomingData}
      options={options}
    />
  )
}

export default BarGraph
