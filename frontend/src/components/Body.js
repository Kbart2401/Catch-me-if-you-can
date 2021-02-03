import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

//Components
import LoginForm from './Header/LoginForm';
import SignUpForm from './Header/SignUpForm';

import Routes from './Body/RoutesPage/Route';
import MyRoutes from './Body/Dashboard/myRoutes';
import Dashboard from './Body/Dashboard/Dashboard';
import Profile from './Body/Profile'
import Splash from './Body/Splash';
import User from './Body/Profile';
import UsersList from './Body/UsersList';
import RivalsList from './Body/Community/RivalsList';
import MapSearch from './Body/RoutesPage/MapSearch';
import CreateMap from './Body/RoutesPage/CreateMap'


//MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (user)
          ? (<Component user={user} {...rest} />)
          : (<Redirect to='/login' />)
      }}
    />
  )
};

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#e9ecef',
    padding: '1rem',
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
      <Paper className={classes.paper} elevation={0} >
        <Switch>
          <Route exact path="/" render={props => <Splash {...props} />} />
          <Route exact path="/login" render={props => <LoginForm {...props} />} />
          <Route exact path="/signup" render={props => <SignUpForm {...props} />} />
          <Route exact path='/route/:routeid' render={props => <Routes {...props} />} />
          <ProtectedRoute exact user={user} path="/create-route" component={(CreateMap)} />
          <ProtectedRoute exact user={user} path='/community' component={RivalsList} />
          <ProtectedRoute exact user={user} path='/my-routes' component={MyRoutes} />
          <ProtectedRoute exact user={user} path='/profile' component={Profile} />
          <ProtectedRoute exact user={user} path="/users" component={UsersList} />
          <ProtectedRoute exact user={user} path="/dashboard/:userId" component={Dashboard} />
          <ProtectedRoute exact user={user} path="/users/:userId" component={Profile} />
          <ProtectedRoute exact user={user} path="/search" component={MapSearch} />
        </Switch>
      </Paper>
    </div>
  )
}

export default Body
