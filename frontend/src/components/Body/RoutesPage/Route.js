import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
  console.log(result)
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
  const routeId = useParams();

  const [runUserId, setRunUserId] = useState() //AUTO POPULATED FROM PROPS or REDUX STORE
  const [runUser, setRunUser] = useState('') //AUTO POPULATED FROM PROPS or REDUX STORE
  const [runTime, setRunTime] = useState('')
  const [runDate, setRunDate] = useState(new Date())

  const [open, setOpen] = useState(false);

  const handleChange = (prop) => (e) => {
    switch (prop) {
      case 'user':
        setRunUser(e.target.value)
        break;
      case 'time':
        setRunTime(e.target.value)
        break;
      case 'date':
        setRunUser(e.target.value)
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

  return (
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
              <Typography variant='h5' style={{ padding: '6px 8px' }}>{routeInfo.name}</Typography>
              <ul>
                <li><Typography style={{ padding: '0px 8px' }}>Route founded by:<Button onClick={() => handleClick(routeInfo.userPath)}>{routeInfo.user}</Button></Typography></li>
                <li><Typography style={{ padding: '6px 8px' }}>Location: {routeInfo.location}</Typography></li>
                <li><Typography style={{ padding: '6px 8px' }}>Length: {routeInfo.distance} km</Typography></li>
                <li><Typography style={{ padding: '6px 8px' }}>{routeInfo.runs} Rivals Posted</Typography></li>
              </ul>
            </div>
            <div className={classes.postrun_container}>
              <Button onClick={() => handleClickOpen()}><Typography>Submit A Run</Typography></Button>
            </div>
          </div>

          {/* LeaderBoard */}
          <div className={classes.route_information_leaderboard}>
            <Typography>LeaderBoard</Typography>
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
                  {rivals.map((rival, index) => (
                    <TableRow key={rival.name}>
                      <TableCell align="right">#{rival.position}</TableCell>
                      <TableCell component="th" scope="row">
                        <Typography><Button onClick={() => handleClick(rival.path)}>
                          {rival.name}
                        </Button></Typography>
                      </TableCell>
                      <TableCell align="right">{rival.bestTime}</TableCell>
                      <TableCell align="right">{rival.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                fullWidth
              />
              <DatePicker
                value={runDate}
                onChange={handleChange('date')}
              />
              <TextField
                id="time"
                label="Alarm clock"
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleClose} color="primary">
              Submit Run
          </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>

    </div>
  )
}

export default Routes
