import React, { useEffect, useState } from 'react';

//MUI
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '50%',
    maxWidth: '1400px',
    minWidth: '1200px',
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundImage: 'url(\'/pictures/topography.jpg\')',

    color: 'white',
    // width: '100rem',
  },
  title_text: {
    position: 'absolute',
    display: 'flex',
    // top: '-52rem',
    height: '35rem',
    width: '70rem',

    // backgroundImage: 'url(\'/pictures/topography.jpg\')',
    background: 'blue',
    textAlign: 'center',
    alignItems: 'center',

    borderRadius: '1rem',

    fontSize: '10rem',
    fontFamily: '\'helvetica\', sans-serif',
    textTransform: 'uppercase',
    fontWeight: '1000',

    mixBlendMode: 'multiply',
  },

  map_demo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    // backgroundImage: 'url(\'/pictures/white_topography.webp\')',
    background: '#343a40',
    // padding: '1rem',
    borderRadius: '1rem',
    clipPath: 'inset(0)',

    margin: '1rem 0',
  },
  map_demo_image_container: {
    display: 'grid',
    gridTemplateColumns: '20rem 10rem 20rem',
    zIndex: '1'
  },
  map_demo_image_wrapper: {
    display: 'flex',
    justifyContent: 'start',
    position: 'relative',
    left: '-13rem',
  },
  map_demo_progress: {
    background: 'blue',
    width: '35rem',
    height: '900px',

    top: '-200px',

    position: 'fixed',
  },
}));

const Splash = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {/* <video autoPlay muted src='/pictures/wave.mp4' width='100%' /> */}
        <video autoPlay muted width='100%' src='https://www.jonathandempsey.dev/wp-content/uploads/2020/05/waves.mp4' />
        <p className={classes.title_text}>
          Catch Me
          If You Can
          </p>
      </div>

      <div className={classes.map_demo}>
        <div className={classes.map_demo_image_container}>
          <div style={{ gridColumnStart: '1', gridColumnEnd: '2', }} className={classes.map_demo_image_wrapper}>
            <img src='/pictures/Layer2.png' width='900' />
          </div>
          <div style={{ gridColumnStart: '2', gridColumnEnd: '3', }} className={classes.map_demo_image_wrapper}>
            <img src='/pictures/Layer1.png' width='900' />
          </div>
        </div>
        <div className={classes.map_demo_progress}></div>
      </div>

      <div className={classes.test}>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
        <Typography variant='h1' >filler</Typography>
      </div>
    </div>
  )
}

export default Splash
