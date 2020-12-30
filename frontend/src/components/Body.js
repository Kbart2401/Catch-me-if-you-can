import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';

//Components
import LoginForm from './Header/LoginForm';
import SignUpForm from './Header/SignUpForm';
import Home from './Body/Home';
import Profile from './Body/Profile'
import Splash from './Body/Splash';
import User from './Body/User';
import UsersList from './Body/UsersList';

const ProtectedRoute = props => {
  const { Component, path, exact, user } = props
  return (
    <Route {...props}>
      {user ? props.children : <Redirect to='/login' />}
    </Route>
  )
};

const Body = (props) => {
  // const isLoggedIn = useSelector(state => state.session.user ? true : false);
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(props.user)
    setIsLoaded(true)
  }, [props.user])

  return isLoaded && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Switch>
        <Route exact path="/" render={props => <Splash {...props} />} />
        <Route exact path="/login" render={props => <LoginForm {...props} />} />
        <Route exact path="/signup" render={props => <SignUpForm {...props} />} />
        <ProtectedRoute exact user={user} path="/home" component={Home} />
        <ProtectedRoute exact user={user} path='/profile' component={Profile} />
        <ProtectedRoute exact user={user} path="/users" component={UsersList} />
        <ProtectedRoute exact user={user} path="/users/:userId" component={User} />
      </Switch>
    </div>
  )
}

export default Body
