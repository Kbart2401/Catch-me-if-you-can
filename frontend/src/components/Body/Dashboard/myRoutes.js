import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const MyRoutes = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const routes = useSelector(state => state.session.created_routes);
  const [isLoaded, setIsLoaded] = useState(false); 

  // const handleClick = (path) => { 
  //   setIsLoaded(false); 
  //   history.push(path)
  // }

  useEffect(() => {
    setIsLoaded(true)
  }, [routes]); 

  useEffect(() => {
    if (!props.location) return; 
    if (props.location.state) {
      console.log("HEY EVERYBODY");
      console.log(props.location.state);   
    }
  }, []);


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
