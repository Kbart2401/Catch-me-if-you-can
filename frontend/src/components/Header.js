import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import { AuthContext } from '../context/Context';
import LoginForm from './Header/LoginForm';
import SignupForm from './Header/SignupForm';

//Mui
import { makeStyles, Typography, IconButton, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

//Icons
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

const Header = () => {
  return (
    <>
      <h1>Header</h1>
    </>
  )
}

export default Header
