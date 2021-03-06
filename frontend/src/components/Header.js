import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleModal from './Header/SimpleModal';

import * as sessionActions from '../store/actions/session'

//Mui
import { makeStyles, Typography, Button, Popper } from '@material-ui/core';
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

    maxWidth: '1800px',
    minWidth: '1200px',
    padding: '0.5rem',
    borderBottom: '3px solid #e9ecef',
    backgroundColor: '#63B3ED',
    color: 'white',
    '& p': {
      color: 'white',
      textShadow: '2px 2px #3f51b5',
    },
  },
  navBar_left: {
    display: 'flex',
    gridArea: 'left',
    maxWidth: '25rem',
  },
  navBar_middle: {
    display: 'flex',
    gridArea: 'middle',
    width: '400px',
  },
  navBar_right: {
    display: 'flex',
    alignItems: 'center',
    gridArea: 'right',
  },


  navBar_navContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
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

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loadedUser = useSelector(state => state.session.user)
  const [user, setUser] = useState(props.user)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modal, setModal] = useState(false)
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget.id);
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

  const openModal = () => {
    setModal(true)
  }

  const switchStatement = (id) => {
    const el = document.getElementById(id)
    switch (id) {
      case 'route':
        return (
          <Menu
            anchorEl={el}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted
            getContentAnchorEl={null}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuClick('/my-routes')}><Typography>My Routes</Typography></MenuItem>
            <MenuItem onClick={() => handleMenuClick('/create-route')}><Typography>Create Route</Typography></MenuItem>
            <MenuItem onClick={() => handleMenuClick('/search')}><Typography>Find Route</Typography></MenuItem>
          </Menu>
        )
      case 'profile':
        return (
          <Menu
            anchorEl={el}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted
            getContentAnchorEl={null}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {/* <MenuItem onClick={() => handleMenuClick('/profile')}>Profile</MenuItem> */}
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        )
      default:
        return
    }
  }

  useEffect(() => {
    setUser(loadedUser)
    setIsLoaded(true)
  }, [loadedUser, user])

  return isLoaded && (
    <>
      <div className={classes.navBar_root}>

        {/* LEFT */}
        <div className={classes.navBar_left}>
          <Button onClick={() => user ? handleMenuClick(`/dashboard/${user.id}`) : handleMenuClick('/')}>
            <img src={require('../images/logo.png')} style={{ width: '200px', filter: 'contrast(200%)', boxShadow: '0px 0px 5px grey', borderRadius: '5%' }} />
            {/* <Typography color='primary' >Catch Me If You Can</Typography> */}
          </Button>
        </div>

        {/* MIDDLE */}
        <div className={classes.navBar_middle}>
          <div className={classes.navBar_navContainer}>
            {user ? (
              <>
                <Button onClick={() => handleNavClick(`/dashboard/${user.id}`)}>
                  <Typography>Dashboard</Typography>
                </Button>
                <Button
                  id='route'
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit">
                  <Typography>Routes</Typography>
                </Button>
                <Button onClick={() => handleNavClick('/community')}>
                  <Typography>Community</Typography>
                </Button>
              </>
            ) : (<><SimpleModal modal={modal} setModal={setModal} /><Button onClick={openModal}><Typography>Dashboard</Typography></Button>
              <Button onClick={openModal}><Typography>Routes</Typography></Button>
              <Button onClick={openModal}><Typography>Community</Typography></Button></>)
            }
          </div>
        </div>

        {/* RIGHT */}
        <div className={classes.navBar_right}>
          {user ? (
            <Button
              id='profile'
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
      {switchStatement(anchorEl)}
    </>
  )
}

export default Header
