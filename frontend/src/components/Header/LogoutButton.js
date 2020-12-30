import React from "react";
import { useDispatch } from 'react-redux';
import { Button } from "@material-ui/core";

import * as sessionActions from '../../store/actions/session';

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser)
    setAuthenticated(false);
  };

  return <Button variant="contained" onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
