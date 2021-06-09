import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import clsx from 'clsx';
import {
  makeStyles,
  AppBar,
  Link,
  Box,
  Typography,
  IconButton,
  Button,
  Popover,
  MenuItem,
  Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';

import LeftSidebar from './LeftSidebar';
import { authState } from '../atoms';

import LogoTextSvg from '../assets/images/logo-text.svg';
import PersonSvg from '../assets/images/person.svg';

import { routes, HEADER_HEIGHT } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    padding: theme.spacing(2),
    zIndex: 9,
    padding: 0,
    background: '#FFFFFF',
    boxShadow: '0px 4px 16px rgba(131, 131, 131, 0.1)',
    height: HEADER_HEIGHT,
    '& .main-container': {
      display: 'flex',
      margin: '0 auto',
      width: '100%',
      height: '100%',
      paddingLeft: '100px',
      paddingRight: '65px',
      overflow: 'hidden',
      alignItems: 'center',
    },
  },
  brand: {
    flexShrink: 0,
    cursor: 'pointer',
    textDecoration: 'none !important',
    color: 'white',
    '& img': {
      width: 150,
    },
  },
  authControlWrapper: {
    marginLeft: 'auto',
    height: '100%',
  },
  menuButton: {
    display: 'none',
    '& .MuiIconButton-label': {
      color: theme.palette.primary.main,
    },
    '@media (max-width: 767px)': {
      display: 'block',
    },
  },
  loginBtn: {
    background: 'linear-gradient(-180deg, #3C54B9 16%, #869DFF 115%)',
    borderRadius: 0,
    width: 200,
    height: '100%',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
    '& img': {
      width: 17.36,
      height: 20,
      marginRight: 12.46,
    },
  },
  userButton: {
    background: 'linear-gradient(180deg, #7a91f4 16%, #3c54b9 115%)',
    borderRadius: 0,
    width: 250,
    height: '100%',
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    '& .arrowDown': {
      position: 'absolute',
      color: 'white',
      right: 5,
    },
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
    textAlign: 'left',
    '& .MuiTypography-subtitle1': {
      fontWeight: 700,
      color: 'white',
      lineHeight: '20px',
    },
    '& .MuiTypography-body1': {
      color: 'white',
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white',
    overflow: 'hidden',
    marginLeft: 18,
  },
  settingBtn: {
    background: 'linear-gradient(180deg, #FDFDFE 16%, #DEDEDE 96%)',
    borderRadius: 0,
    width: 75,
    height: '100%',
  },
  dropdownWrapper: {
    width: 250,
  },
  authDropdown: {
    justifyContent: 'flex-start',
    height: 75,
    background: 'linear-gradient(180deg, #FDFDFE 16%, #DEDEDE 96%)',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(129, 115, 114, 0.99)',
    paddingLeft: 60,
    paddingRight: 60,
    '& .profile-user-icon': {
      marginRight: 35.46,
      fill: '#817372',
    },
    '& .logout-icon': {
      marginRight: 35.46,
    },
    '&:focus': {
      background: 'linear-gradient(180deg, #3C54B9 16%, #869DFF 115%)',
      color: 'white',
      '& .profile-user-icon': {
        fill: 'white',
        '& path': {
          fill: 'white',
        },
      },
      '& .logout-icon': {
        marginRight: 35.46,
        '& path': {
          stroke: 'white',
        },
      },
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [auth, setAuth] = useRecoilState(authState);

  const onLoginClick = (event) => {
    history.push(routes.LOGIN);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    setTimeout(() => {
      history.push(routes.LOGIN);
    }, 100);
  };

  return (
    <>
      <AppBar className={classes.root} position='fixed'>
        <Box className={'main-container'}>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            edge='start'
            className={clsx(classes.menuButton, sidebarOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Link
            className={classes.brand}
            onClick={() => {
              history.push(routes.HOME);
            }}
          >
            <img src={LogoTextSvg} alt='logo' />
          </Link>
          <Box className={classes.authControlWrapper}>
            {auth !== null ? (
              <>
                <Button className={classes.userButton} onClick={handleClick}>
                  <Box className={classes.userInfo}>
                    <Typography variant='subtitle1'>{auth.username}</Typography>
                    <Typography varaint='body1'>{auth.role}</Typography>
                  </Box>
                  <Box className={classes.userAvatar}>
                    <img
                      src={auth.profileImg ? auth.profileImg : PersonSvg}
                      style={{ width: auth.profileImg ? '100%' : '60%' }}
                    />
                  </Box>
                  <ArrowDropDownIcon className={'arrowDown'} />
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Paper className={classes.dropdownWrapper}>
                    <MenuItem className={classes.authDropdown}>
                      <svg
                        className='profile-user-icon'
                        width='17'
                        height='21'
                        viewBox='0 0 17 21'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M11.1151 4.84603C11.1151 6.41785 9.84093 7.69206 8.26911 7.69206C6.69729 7.69206 5.42308 6.41785 5.42308 4.84603C5.42308 3.27421 6.69729 2 8.26911 2C9.84093 2 11.1151 3.27421 11.1151 4.84603ZM13.1151 4.84603C13.1151 7.52242 10.9455 9.69206 8.26911 9.69206C5.59272 9.69206 3.42308 7.52242 3.42308 4.84603C3.42308 2.16964 5.59272 0 8.26911 0C10.9455 0 13.1151 2.16964 13.1151 4.84603ZM5 11.1154C2.23858 11.1154 0 13.354 0 16.1154V20.5959H2V16.1154C2 14.4585 3.34314 13.1154 5 13.1154H11.5381C13.1949 13.1154 14.5381 14.4585 14.5381 16.1154V20.5959H16.5381V16.1154C16.5381 13.354 14.2995 11.1154 11.5381 11.1154H5Z'
                          fill='#817372'
                          fillOpacity='0.99'
                        />
                      </svg>
                      Profile
                    </MenuItem>
                    <MenuItem className={classes.authDropdown} onClick={logout}>
                      <svg
                        className='logout-icon'
                        width='20'
                        height='21'
                        viewBox='0 0 20 21'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M4.0469 5C2.17845 6.5706 1 8.86852 1 11.4286C1 16.1624 5.02944 20 10 20C14.9706 20 19 16.1624 19 11.4286C19 8.86852 17.8216 6.5706 15.9531 5'
                          stroke='#817372'
                          strokeOpacity='0.99'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M10 1V11'
                          stroke='#817372'
                          strokeOpacity='0.99'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      Logout
                    </MenuItem>
                  </Paper>
                </Popover>
                <Button className={classes.settingBtn}>
                  <SettingsIcon />
                </Button>
              </>
            ) : (
              <Button
                className={classes.loginBtn}
                variant='contained'
                color='primary'
                onClick={onLoginClick}
              >
                <img src={PersonSvg} alt='person' />
                Login
              </Button>
            )}
          </Box>
        </Box>
      </AppBar>
      <LeftSidebar open={sidebarOpen} />
    </>
  );
};

export default Header;
