import React, { useEffect, useState } from 'react';

//MUI
import { makeStyles, Typography } from '@material-ui/core';

const Splash = () => {
  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = () => setOffsetY(window.pageYOffset)

  const useStyles = () => makeStyles(() => ({
    root: {
      minWidth: '50%',
    },
    parallax: {
      transform: `translateY(${offsetY * 0.5}px)`,
    },
  }));
  const classes = useStyles()

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scrol;', handleScroll)
  })

  return (
    <>
      <div className={classes.root}>
        <div className={classes.parallax}>
          <div className={classes.parallax_background}>
            <image src='pictures/bia-andrade-inUID_-1lCU-unsplash.jpg' />
          </div>
          <div className={classes.parallax_content}>
            <Typography>New to the area and want to explore scenic workout routes?</Typography>
          </div>
        </div>
      </div>
    </>
  )
}

export default Splash
