import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/actions/session'

//MUI
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//Icons
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center'

  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // const loadedUser = useSelector(state => state.session.user)
  const [user, setUser] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // console.log('loadedUser: ', loadedUser)
    // loadedUser ? setUser(loadedUser) : setUser(null);
    setUser(props.user)
    setIsLoaded(true)
  }, [props.user])

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    history.push(path)
    // user ? history.push(path) : history.push('/login')
    handleMenuClose()
  }

  const handleLogout = () => {
    console.log('logging out')
    dispatch(sessionActions.logoutUser)
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

  return isLoaded && (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => handleMenuClick('/home')}>
            <Typography className={classes.title} variant="h6" noWrap>
              Catch Me If You Can
            </Typography>
          </Button>
          <div className={classes.navButtons}>

          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user ? (
              <>
                <Typography>{user ? user.first_name : 'Guest'}</Typography>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
                <Button onClick={() => handleMenuClick('/login')}><Typography>Login</Typography></Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
      { renderMenu}
    </div >
  );
}

export default NavBar
