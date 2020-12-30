import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  }
})

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Footer</h1>
    </div>
  )
}

export default Footer
