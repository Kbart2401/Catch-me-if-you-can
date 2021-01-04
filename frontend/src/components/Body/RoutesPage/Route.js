import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/actions/session'

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  route_map_container: {
    backgroundColor: 'white',
    minWidth: '20rem',
    margin: '1rem',
    borderRadius: '.5rem',
    minHeight: '20rem',
  },
  route_information_container: {
    margin: '1rem',
  },

  route_stat_container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  route_stats: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

//DUMMY DATA
const time = 4.3;
const date = '08/11/2020';
const calculateTime = (time) => {
  const minutes = (time >= 60) ? Math.floor(time) - 60 : Math.floor(time)
  const seconds = (time % 1).toFixed(2) * 60
  const hours = Math.floor(time - minutes) / 60;
  const result = `${(hours < 10) ? 0 : ''}${hours}:${(minutes < 10) ? 0 : ''}${minutes}:${(seconds < 10) ? 0 : ''}${seconds}`
  return result
}

const arrSum = function (arr) {
  const num = arr.reduce(function (a, b) {
    return a + parseFloat(b)
  }, 0);
  return num.toFixed(2)
}

const routeInfo = {
  name: 'Apple Hill',
  user: 'User1',
  distance: '5',
  runs: '34',
  location: 'Somewhere',
  userPath: `/users/1`,
}

const rivals = [
  {
    position: 1,
    name: 'user1',
    path: `/users/1`,
    bestTime: `${calculateTime(time)}`,
    date: `${date}`,
  },
  {
    position: 2,
    name: 'user2',
    path: `/users/2`,
    bestTime: `${calculateTime(time)}`,
    date: `${date}`,
  },
  {
    position: 3,
    name: 'user3',
    path: `/users/3`,
    bestTime: `${calculateTime(time)}`,
    date: `${date}`,
  },
  {
    position: 4,
    name: 'user4',
    path: `/users/4`,
    bestTime: `${calculateTime(time)}`,
    date: `${date}`,
  },
  {
    position: 5,
    name: 'user5',
    path: `/users/5`,
    bestTime: `${calculateTime(time)}`,
    date: `${date}`,
  },
]

//Component
const Routes = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { routeid } = useParams();

  const user = useSelector(state => state.session.user)
  const [route, setRoute] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [runnerName, setRunnerName] = useState(null)
  const [runTime, setRunTime] = useState(60)

  const [open, setOpen] = useState(false);

  const handleChange = (prop) => (e) => {
    switch (prop) {
      case 'user':
        setRunnerName(e.target.value)
        break;
      case 'time':
        setRunTime(e.target.value)
        break;
      default:
        break;
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (path) => {
    history.push(path)
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/routes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
    history.push('/my-routes')
  }

  const handleSubmit = async () => {
    handleClose();

    try {
      const res = await fetch('/api/runtimes/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(user.id),
          routeId: parseInt(routeid),
          time: parseInt(runTime),
        })
      });
      const data = await res.json();
      // await setRoute(data)
      console.log('Run data receieved: ', data)
    }
    catch (e) {
      console.error(e)
    }
  }



  //Get Route info
  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/routes/${routeid}`)
      const data = await res.json()

      setRoute(data)
    })();
    setIsLoaded(true)
  }, [])

  //Update user info
  useEffect(() => {
    if (user) {
      setRunnerName(user.first_name)
    }
  }, [user])

  const LeaderBoardTable = () => (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align="right">Rival</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {route.run_times.map((run, index) => (
            <TableRow key={run.name}>
              <TableCell align="right">#{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                <Typography><Button onClick={() => handleClick(`/users/${run.user_id}`)}>
                  {run.user_name}
                </Button></Typography>
              </TableCell>
              <TableCell align="right">{run.time}</TableCell>
              <TableCell align="right">{run.date_ran}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return isLoaded && (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>

        {/* Map Component */}
        <Paper className={classes.route_map_container}>
          <Typography>Map Here</Typography>
        </Paper>
        <div className={classes.route_information_container}>

          {/* Basic Information */}
          <div className={classes.route_stat_container}>
            <div className={classes.route_stats}>
              <Typography variant='h5' style={{ padding: '6px 8px' }}>{route.name}</Typography>
              <ul>
                <li><Typography style={{ padding: '0px 8px' }}>Route founded by:<Button onClick={() => handleClick(`/users/${route.user_creator}`)}>{route.user}</Button></Typography></li>
                {/* <li><Typography style={{ padding: '6px 8px' }}>Location: {routeInfo.location}</Typography></li> */}
                <li><Typography style={{ padding: '6px 8px' }}>Length: {route.distance} km</Typography></li>
                <li><Typography style={{ padding: '6px 8px' }}>{route.runCount} Rivals Posted</Typography></li>
              </ul>
            </div>
            <div className={classes.postrun_container}>
              <Button onClick={() => handleClickOpen()}><Typography>Submit A Run</Typography></Button>
            </div>
          </div>

          {/* LeaderBoard */}
          <div className={classes.route_information_leaderboard}>
            <Typography>LeaderBoard</Typography>
            {
              (route.run_times)
                ? <LeaderBoardTable />
                : <Typography>No Run Data</Typography>
            }
          </div>
          <div>
            <Button onClick={() => handleDelete()}><Typography>Delete Route</Typography></Button>
          </div>
        </div>

        {/* POST RUN DIALOG */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Submit A Run</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To submit a run, please fill out this short form.
            </DialogContentText>
            <div className={classes.inputFields}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="string"
                defaultValue={runnerName}
                onChange={handleChange('user')}
                fullWidth
              />
              <TextField
                required
                id="time"
                label="Time (in minutes)"
                type="number"
                defaultValue={runTime}
                value={runTime}
                className={classes.textField}
                onChange={handleChange('time')}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 5, // 5 min
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit Run
          </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>

    </div>
  )
}

export default Routes
