import React, { useEffect, useState } from 'react';
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

  const [isLoaded, setIsLoaded] = useState(false)
  const [user] = useState(props.user)
  const [runs, setRuns] = useState();

  const handleClick = (path) => {
    history.push(path)
  }

  const calculateTime = (time) => {
    const minutes = (time >= 60) ? Math.floor(time) - 60 : Math.floor(time)
    const seconds = (time % 1).toFixed(2) * 60
    const hours = Math.floor(time - minutes) / 60;
    const result = `${(hours < 10) ? 0 : ''}${hours}:${(minutes < 10) ? 0 : ''}${minutes}:${(seconds < 10) ? 0 : ''}${seconds}`
    return result
  }

  const calculateDate = (date) => {
    const newDate = new Date(date)
    const [month, day, year] = newDate.toLocaleDateString("en-US").split("/")
    const formattedDate = `${month}/${day}/${year}`

    return formattedDate
  }

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`/api/runtimes/users/${user.id}`)
        const { run_times } = await res.json()
        setRuns(run_times)
        setIsLoaded(true)
      } catch (e) {
        console.error(e)
      }
    })();
  }, [])


  return isLoaded && (
    <>
      {
        (runs && runs.length > 0)
          ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Route</TableCell>
                    <TableCell align="right">Distance (KM)</TableCell>
                    <TableCell align="right">Time</TableCell>
                    {/* <TableCell align="right">Location</TableCell> */}
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {runs.map((run, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        <Typography><Button onClick={() => handleClick(`/route/${run.route_id}`)}>
                          {run.route_name}
                        </Button></Typography>
                      </TableCell>
                      <TableCell align="right">{run.distance}</TableCell>
                      <TableCell align="right">{`${calculateTime(run.time)}`}</TableCell>
                      {/* <TableCell align="right">{row.location}</TableCell> */}
                      <TableCell align="right">{`${calculateDate(run.date_ran)}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
          : <Typography>You have not recorded any Runs.</Typography>
      }
    </>
  )
}

export default History
