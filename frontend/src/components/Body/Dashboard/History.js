import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const History = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const rows = [
    {
      name: 'Apple Hill',
      distance: 5,
      time: 50,
      location: 'Somewhere',
      date: '--/--/--',
      path: '/route'
    },
    {
      name: 'Banana Hill',
      distance: 5,
      time: 50,
      location: 'Wheresome',
      date: '--/--/--',
      path: '/route'
    },
    {
      name: 'lol Hill',
      distance: 5,
      time: 50,
      location: 'Hitherto',
      date: '--/--/--',
      path: '/route'
    },
    {
      name: 'No Hill',
      distance: 5,
      time: 50,
      location: 'Hereabouts',
      date: '--/--/--',
      path: '/route'
    },
  ]

  const handleClick = (path) => {
    history.push(path)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Route</TableCell>
              <TableCell align="right">Distance (KM)</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography><Button onClick={() => handleClick(row.path)}>
                    {row.name}
                  </Button></Typography>
                </TableCell>
                <TableCell align="right">{row.distance}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default History
