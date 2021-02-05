import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';


//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';

const IntroSeq = styled.div`
  justify-content: center;
  width: 100rem;
  height: 60rem;
  background: url('/pictures/blue.jpg');
  padding: 1rem 0;
  border-radius: 1rem;
`;

const Clip1 = styled.div`
background-image: url('/pictures/lost.jpg');
background-size: cover;
clip-path: polygon(0 0, 33% 0, 33% 100%, 0 100%);
&:hover {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  z-index: 99;
}
`;

const Clip3 = styled.div`
  background-image: url('/pictures/pooped.jpg');
  background-size: cover;
  background-position: center;
  clip-path: polygon(69% 0, 100% 0, 100% 100%, 69% 100%);
  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 99;
  }
`;

const Clip2 = styled.div`
  background-image: url('/pictures/stairs.jpg');
  background-size: cover;
  clip-path: polygon(36% 0, 66% 0, 66% 100%, 36% 100%);
  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 99;
  };
`;

const Card = styled.div`
  position: absolute;
  z-index: 5;
`

const PicContainer = styled.div`
  display: flex;
  align-items: center;

  width: 25rem;
  height: 25rem;
  padding: 1rem;

  font-size: 60px;
  color: white;
  font-family: helvetica sans-serif;
  font-weight: 1000;
`


const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50rem;
  height: 20rem;
  background: white;
`


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100rem',
    padding: '1rem',
    backgroundImage: 'url(\'/pictures/topography.jpg\')',
  },

  clip: {
    position: 'absolute',
    top: '63rem',
    left: '50%',

    transition: '0.5s',
    width: '95rem',
    height: '55rem',
    margin: 'calc((95rem / 2) * -1)',

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

  map_demo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    background: '#343a40',
    borderRadius: '1rem',
    width: '75rem',
    height: '100rem',
    clipPath: 'inset(0)',

    margin: '1rem 0',
  },
  map_demo_image_container: {
    display: 'grid',
    position: 'relative',
    top: '-10rem',

    gridTemplateColumns: '20rem 12rem 20rem',
    zIndex: '1',
  },
  map_demo_image_wrapper: {
    display: 'flex',
    justifyContent: 'start',
    position: 'relative',
    left: '-20rem',
  },
  map_demo_progress: {
    background: 'blue',
    width: '60rem',
    height: '900px',

    top: '-200px',

    position: 'fixed',
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
        <Clip1 className={classes.clip}>
          <h1>Dont know</h1>
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
        <video autoPlay muted width='100%' src='https://www.jonathandempsey.dev/wp-content/uploads/2020/05/waves.mp4' loop style={{ borderRadius: '1rem' }} />
        <p className={classes.title_text}>
          Catch Me
          If You Can
          </p>
      </div>

      <div className={classes.map_demo}>
        <div className={classes.map_demo_image_container}>

          <div style={{ gridColumnStart: '1', gridColumnEnd: '2', }} className={classes.map_demo_image_wrapper}>
            <img src='/pictures/Layer2.png' width='1200' />
          </div>

          <div style={{ gridColumnStart: '2', gridColumnEnd: '3', }} className={classes.map_demo_image_wrapper}>
            <img src='/pictures/Layer1.png' width='1200' />
          </div>

        </div>
        <div className={classes.map_demo_progress}></div>
      </div>

      <Card data-aos="fade-left" data-aos-offset="700" style={{
        top: '140rem',
        left: '45rem',
        width: 'fit-content',
        height: 'fit-content',
      }}>
        <PicContainer style={{
          backgroundImage: 'url(\'/pictures/mountain_bike.jpg\')',
          backgroundSize: '500px 700px',
          backgroundPosition: 'center',
        }}>
          <p style={{ color: 'white', }}>
            Get access to all the popular
            trails and routes in your area
        </p>
        </PicContainer>
      </Card>

      <Card data-aos="fade-left" data-aos-offset="700" style={{
        top: '160rem',
        left: '80rem',
      }}>
        <PicContainer style={{
          backgroundImage: 'url(\'/pictures/flare.jpg\')',
          backgroundSize: '500px 700px',
          backgroundPosition: 'center',
        }}>
          <p style={{ color: 'black', }}>
            Climb the leaderboards
            of newfound motivation
        </p>
        </PicContainer>
      </Card>
      <Card data-aos="fade-left" data-aos-offset="700" style={{
        top: '180rem',
        left: '45rem',
      }}>
        <PicContainer style={{
          backgroundImage: 'url(\'/pictures/sponsored_by_nike.jpg\')',
          backgroundSize: '500px 500px',
          backgroundPosition: 'center',
        }}>
          <p style={{ color: 'white', }}>
            Keep up to date
            with you progress
        </p>
        </PicContainer>
      </Card>
      <Card data-aos="fade-left" data-aos-offset="500" style={{
        top: '205rem',
        left: '65rem',
        // width: '10rem',
      }}>
        <PicContainer style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // backgroundImage: 'url(\'/pictures/topography.jpg\')',
          backgroundSize: '500px 500px',
          backgroundPosition: 'center',
        }}>
          <p style={{ color: 'black', }}>Ready to begin Your Journey</p>
          <Button variant='outlined' onClick={() => handleClick()}>Get Started</Button>
        </PicContainer>
      </Card>
    </div>
  )
}

export default Splash
