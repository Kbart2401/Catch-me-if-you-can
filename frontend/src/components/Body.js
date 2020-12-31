import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

//Components
import LoginForm from './Header/LoginForm';
import SignUpForm from './Header/SignUpForm';
import Home from './Body/Home';
import Profile from './Body/Profile'
import Splash from './Body/Splash';
import User from './Body/User';
import UsersList from './Body/UsersList';
import RivalsList from './Body/community/RivalsList';
import Routes from './Body/Routes';
import Map from './Body/Map'; 

//MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const ProtectedRoute = props => {
  return (
    <Route {...props}>
      {!props.user && <Redirect to='/login' />}
    </Route>
  )
};

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#e9ecef',
  },
}))

const Body = (props) => {
  const classes = useStyles()

  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(props.user)
    setIsLoaded(true)
  }, [props.user])

  return isLoaded && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper className={classes.paper} elevation={0}>
        <Switch>
          <Route exact path="/" render={props => <Splash {...props} />} />
          <Route exact path="/login" render={props => <LoginForm {...props} />} />
          <Route exact path="/signup" render={props => <SignUpForm {...props} />} />
          <Route exact path='/routes' render={props => <Routes {...props} />} />
          <ProtectedRoute exact user={user} path='/community' component={RivalsList} />
          <ProtectedRoute exact user={user} path="/home" component={Home} />
          <ProtectedRoute exact user={user} path='/profile' component={Profile} />
          <ProtectedRoute exact user={user} path="/users" component={UsersList} />
          <ProtectedRoute exact user={user} path="/users/:userId" component={User} />
          <ProtectedRoute exact user={user} path="/create" component={Map} /> 
        </Switch>
      </Paper>
    </div>
  )
}

export default Body
