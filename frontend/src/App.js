import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import * as sessionActions from './store/actions/session';

//Component Imports
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

//MUI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1000px',
    display: 'grid',
    gridAutoFlow: 'row',
    alignItems: 'center',
    minHeight: '96vh',
    padding: '2rem',
    gap: '2rem',
    width: '100%',
    gridTemplateRows: 'auto 1fr auto',
  }
}))

const App = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Header user={props.user} />
        <Body user={props.user} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const AppContainer = (props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(data => setUser(data))
    setIsLoaded(true)
  }, [dispatch]);

  return isLoaded && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <App user={user} />
    </div>
  )
}

export default AppContainer;
