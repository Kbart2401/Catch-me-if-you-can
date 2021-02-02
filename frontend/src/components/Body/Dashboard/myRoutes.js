import React, { useEffect, useState } from 'react';
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

  const routes = useSelector(state => state.session.created_routes)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleClick = (path) => {
    history.push(path)
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [routes])

  return isLoaded && (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Route</TableCell>
              <TableCell align="right">Distance (KM)</TableCell>
              <TableCell align="right">Runs</TableCell>
              {/* <TableCell align="right">Location</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Typography><Button onClick={() => handleClick(`/route/${row.id}`)}>
                    {row.name}
                  </Button></Typography>
                </TableCell>
                <TableCell align="right">{row.distance}</TableCell>
                <TableCell align="right">{row.runners}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default MyRoutes
