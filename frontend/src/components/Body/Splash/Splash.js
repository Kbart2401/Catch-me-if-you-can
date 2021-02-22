import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';

//Pictures
import Lost from './lost.jpg';
import Pooped from './pooped.jpg';
import Stairs from './stairs.jpg'

import Topography from './topography.jpg';
import Layer1 from './Layer1.png'
import Layer2 from './Layer2.png'

const IntroSeq = styled.div`
  position: relative;
  justify-content: center;
  width: 100vw;
  height: 60rem;
  background: url('./blue.jpg');
  padding: 1rem 0;
  border-radius: 1rem;
`;

const Clip1 = styled.div`
background-image: url(${Lost});
background-size: cover;
clip-path: polygon(0 0, 33% 0, 33% 100%, 0 100%);
&:hover {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  z-index: 99;
}
`;

const Clip3 = styled.div`
background-image: url(${Pooped});
  background-size: cover;
  background-position: center;
  clip-path: polygon(69% 0, 100% 0, 100% 100%, 69% 100%);
  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 99;
  }
`;

const Clip2 = styled.div`
background-image: url(${Stairs});
  background-size: cover;
  clip-path: polygon(36% 0, 66% 0, 66% 100%, 36% 100%);
  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 99;
  };
`;

const MapImageContainer = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  z-index: 2;
`

const Card = styled.div`
  position: absolute;
  left: 50%;
  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 25rem;
  height: 25rem;
  padding: 1rem;

  font-size: 60px;
  color: white;
  font-family: helvetica sans-serif;
  font-weight: 1000;
`

const CardWrapper = styled.div`
  position: relative;
  width: 100vw
`

const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50rem;
  height: 20rem;
  background: white;
`

const MapDemo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  height: 100vw;
  width: 75rem;
  margin: 1rem 0;
  clip-path: inset(0);
`

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100vw',
    padding: '1rem',
    backgroundImage: `url(${Topography})`,
  },

  clip: {
    position: 'absolute',
    // top: 'rem',
    left: '50%',

    transition: '0.5s',
    width: '95vw',
    height: '55rem',
    transform: 'translate(-50%, 0)',

    fontSize: '2rem',
    color: 'black',
    fontFamily: 'helvetica sans-serif',
    fontWeight: '1000',
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    color: 'white',
    padding: '1rem 0',
  },
  title_text: {
    position: 'absolute',
    display: 'flex',
    height: '35rem',
    width: '70rem',

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
  map_demo_progress: {
    background: 'blue',
    width: '60rem',
    height: '900px',

    top: '-200px',
    position: 'fixed',

    zIndex: '0',
  },
}));

const Splash = () => {
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector(state => state.session.user)
  const [isLoaded, setIsloaded] = useState(false)

  const handleClick = () => {
    (user)
      ? history.push(`/dashboard/${user.id}`)
      : history.push('/login')
  }

  useEffect(() => {
    setIsloaded(true)
    AOS.init({
      duration: 1000
    })
  }, [user])

  return isLoaded && (
    <div className={classes.root}>

      <IntroSeq>
        <Clip1 className={classes.clip} style={{
        }}>
          <h1>Don't know</h1>
          <h1>the roads?</h1>
          <h1>New area?</h1>
        </Clip1>
        <Clip2 className={classes.clip}>
          <h1>Wanting to track </h1>
          <h1>your progress?</h1>
        </Clip2>
        <Clip3 className={classes.clip}>
          <h1 style={{ color: 'white' }}>Losing your competitive spirit?</h1>
        </Clip3>
      </IntroSeq>

      <div className={classes.title}>
        <video autoPlay muted width='1300rem' src='https://www.jonathandempsey.dev/wp-content/uploads/2020/05/waves.mp4' loop style={{ borderRadius: '1rem' }} />
        <p className={classes.title_text}>
          Catch Me
          If You Can
          </p>
      </div>

      <MapDemo>

        <MapImageContainer style={{ transform: 'translate(-36%, 0)', }}>
          <img src={`${Layer1}`} width='1000rem' height='1500rem' />
        </MapImageContainer>

        <MapImageContainer style={{ transform: 'translate(-64%, 0)', }}>
          <img src={`${Layer2}`} width='1000rem' height='1500rem' />
        </MapImageContainer>

        <Card data-aos="fade-left" data-aos-offset="500" style={{
          // top: '20rem',
          transform: 'translate(-100%, 0)',
        }}>
          <p style={{ color: 'black' }}>
            Get access to all the popular
            trails and routes in your area
        </p>
        </Card>

        <Card data-aos="fade-left" data-aos-offset="500" style={{
          top: '20rem',
          // transform: 'translate(-45%, 0)',
        }}>
          <p style={{ color: 'black' }}>
            Climb the leaderboards
            of newfound motivation
        </p>
        </Card>
        <Card data-aos="fade-left" data-aos-offset="500" style={{
          top: '40rem',
          // transform: 'translate(-45%, 0)',
        }}>
          <p style={{ color: 'black' }}>
            Keep up to date
            with your progress
        </p>
        </Card>
        <Card data-aos="fade-left" data-aos-offset="400" style={{
          top: '66rem',
          transform: 'translate(-50%, 0)',
          background: 'white',
          borderRadius: '1rem',
        }}>
          <p style={{ color: 'black', }}>Ready to begin Your Journey</p>
          <Button variant='outlined' onClick={() => handleClick()}>Get Started</Button>
        </Card>

        <div className={classes.map_demo_progress}></div>
      </MapDemo>
    </div >
  )
}

export default Splash
