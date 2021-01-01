import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../store/actions/session'

//Mui
import { makeStyles, Typography, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//Icons
import AccountCircle from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
  navBar_root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateAreas: '\'left middle right\'',
    justifyContent: 'space-between',
    padding: '0.5rem'
  },
  navBar_left: {
    display: 'flex',
    gridArea: 'left',
    maxWidth: '25rem',
  },
  navBar_middle: {
    // display: 'grid',
    display: 'flex',
    gridArea: 'middle',
  },
  navBar_right: {
    display: 'flex',
    alignItems: 'center',
    gridArea: 'right',
    // maxWidth: '25rem',
  },


  navBar_navContainer: {
    display: 'flex',
    alignItems: 'center',
  },


  navBar_icon: {
    minWidth: '1.5rem',
    maxWidth: '3rem',
  },
  navBar_iconContainer: {
    display: 'grid',
    gridAutoColumns: 'column',
    // gap: '.5rem',
    maxWidth: 'fit-content',
    justifyContent: 'center',
  },
  navBar_iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    // cursor: 'pointer',
  },
  iconButton: {
    '&.MuiIconButton-root': {
      borderRadius: '.5rem',
      padding: '.5rem'
    }
  },


  dialog: {
    width: 'auto',
    height: 'auto',
  }
}));

const navs = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'Routes',
    path: '/routes'
  },
  {
    title: 'Community',
    path: '/community',
  },
]


const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loadedUser = useSelector(state => state.session.user)
  const [user, setUser] = useState(props.user)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (path) => {
    history.push(path)
  }

  const handleMenuClick = (path) => {
    history.push(path)
    handleMenuClose()
  }

  const handleLogout = () => {
    dispatch(sessionActions.logoutUser())
    handleMenuClose()
    history.push('/')
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClick('/profile')}>Profile</MenuItem>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </Menu >
  );

  useEffect(() => {
    setUser(loadedUser)
    setIsLoaded(true)
  }, [loadedUser, user])

  return isLoaded && (
    <>
      <div className={classes.navBar_root}>

        {/* LEFT */}
        <div className={classes.navBar_left}>
          <Button onClick={() => handleMenuClick('/dashboard')}>
            <Typography color='primary' >Catch Me If You Can</Typography>
          </Button>
        </div>

        {/* MIDDLE */}
        <div className={classes.navBar_middle}>
          <div className={classes.navBar_navContainer}>
            {navs.map(nav => (
              <Button key={nav.title} onClick={() => handleNavClick(nav.path)}><Typography>{nav.title}</Typography></Button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={classes.navBar_right}>
          {user ? (
            <Button
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              endIcon={<AccountCircle />}
            >
              <Typography>{user.first_name}</Typography>
            </Button>
          ) : (
              <Button onClick={() => handleMenuClick('/login')}><Typography>Login</Typography></Button>
            )}
        </div>
      </div >
      { renderMenu}
    </>
  )
}

// const Header = (props) => {
//   return (
//     <>
//       <NavBar user={props.user} />
//     </>
//   )
// }

export default Header
