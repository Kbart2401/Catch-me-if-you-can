import React, { useEffect, useState } from 'react';

//MUI
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '50%',
    maxWidth: '1200px'
  },

  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'pictures/topography.jpg',

    color: 'white',
    width: '100rem',
  },
  title_text: {
    color: 'rgba(255, 0, 0, 0.1)',
    textAlign: 'center',
    fontSize: '6rem',
    fontFamily: 'poppins',
    textTransform: 'uppercase',
    fontWeight: '1000',

    // background: '/pictures/wave.mp4',
    backgroundSize: 'cover',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',

    height: '10rem',
  },
}));

const Splash = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography className={classes.title_text}>
          Catch Me
          If You Can
          </Typography>
      </div>
    </div>
  )
}

export default Splash
