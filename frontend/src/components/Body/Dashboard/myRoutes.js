import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/actions/session'; 

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

const RouteTables = ({ routes }) => {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path)
  }

  return (
    <TableBody>
      {
        Object.keys(routes).map((key) => (
          <TableRow key={routes[key].id}>
            <TableCell component="th" scope="row">
              <Typography><Button onClick={() => handleClick(`/route/${routes[key].id}`)}>
                {routes[key].name}
              </Button></Typography>
            </TableCell>
            <TableCell align="right">{routes[key].distance}</TableCell>
            <TableCell align="right">{routes[key].runners}</TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  )
}

const MyRoutes = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const routes = useSelector(state => state.session.created_routes)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [routes]); 

  useEffect(() => {
    if (!props.location) return; 
    if (props.location.state) {
      dispatch(sessionActions.addRoute(props.location.state));   
    }
  }, []);

  return isLoaded && (
    <>
      {
        (routes && Object.keys(routes).length > 0)
          ? (<TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Route</TableCell>
                  <TableCell align="right">Distance (meters)</TableCell>
                  <TableCell align="right">Runs</TableCell>
                  {/* <TableCell align="right">Location</TableCell> */}
                </TableRow>
              </TableHead>
              <RouteTables routes={routes} />
            </Table>
          </TableContainer>
          )
          : <Typography>No Routes to show. Please create a route first.</Typography>
      }
    </>
  )
}

export default MyRoutes
