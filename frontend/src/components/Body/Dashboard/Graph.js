import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

//MUI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '5rem',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const BarGraph = (props) => {
  const classes = useStyles();
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
      // maxBarThickness: 8,
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
