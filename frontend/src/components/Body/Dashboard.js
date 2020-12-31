import React from 'react';

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}))

const Dashboard = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1> Dashboard </h1>
    </div>
  )
}

export default Dashboard
