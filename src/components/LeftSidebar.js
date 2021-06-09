import React from 'react';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { routes, HEADER_HEIGHT, LEFT_SIDEBAR_WIDTH } from '../constants';

import AlertIconWhite from '../assets/images/alert-icon-white.svg';
import AlertIconBlue from '../assets/images/alert-icon-blue.svg';
import MonitorIconWhite from '../assets/images/monitor-icon-white.svg';
import MonitorIconBlue from '../assets/images/monitor-icon-blue.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    top: HEADER_HEIGHT,
    width: LEFT_SIDEBAR_WIDTH,
    height: `calc(100% - ${HEADER_HEIGHT}px)`,
    backgroundColor: 'white',
    paddingTop: 0,
    overflow: 'hidden',
    transition: `width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
    '@media (max-width: 767px)': {
      width: 0,
    },
  },
  sidebarOpen: {
    width: `${LEFT_SIDEBAR_WIDTH}px !important`,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.4rem',
    paddingLeft: 99,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'white',
    height: 75,
    '& .MuiListItemText-root': {
      '& .MuiListItemText-primary': {
        fontSize: 20,
        lineHeight: '24.38px',
        color: '#1D2129',
        fontWeight: 400,
      },
    },
  },
  listItemActive: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      filter: 'brightness(0.9)',
    },
    '& .MuiListItemText-root': {
      '& .MuiListItemText-primary': {
        fontWeight: 700,
        color: 'white',
      },
    },
  },
}));

const LeftSidebar = ({ open }) => {
  const classes = useStyles();
  const history = useHistory();

  const getListItemClass = (itemLocation) => {
    const rootClass = [classes.listItem];
    const currentPath = history.location.pathname;

    switch (itemLocation) {
      case routes.ALERTS:
        if (currentPath === routes.ALERTS || currentPath === routes.HOME)
          rootClass.push(classes.listItemActive);
        break;
      case routes.MONITOR:
        if (currentPath === routes.MONITOR)
          rootClass.push(classes.listItemActive);
        break;
      case routes.SEARCH:
        if (currentPath === routes.SEARCH)
          rootClass.push(classes.listItemActive);
        break;
      case routes.ANALYZE:
        if (currentPath === routes.ANALYZE)
          rootClass.push(classes.listItemActive);
        break;
      case routes.SETTING:
        if (currentPath === routes.SETTING)
          rootClass.push(classes.listItemActive);
        break;
      default:
        break;
    }

    return rootClass;
  };

  return (
    <List
      className={clsx(classes.root, open && classes.sidebarOpen)}
      component='nav'
    >
      <ListItem
        button
        className={getListItemClass(routes.ALERTS).join(' ')}
        onClick={() => {
          history.push(routes.ALERTS);
        }}
      >
        <ListItemIcon>
          {getListItemClass(routes.ALERTS).length > 1 ? (
            <img src={AlertIconWhite} alt='alert' />
          ) : (
            <img src={AlertIconBlue} alt='alert' />
          )}
        </ListItemIcon>
        <ListItemText>Alerts</ListItemText>
      </ListItem>
      <ListItem
        button
        className={getListItemClass(routes.MONITOR).join(' ')}
        onClick={() => {
          history.push(routes.MONITOR);
        }}
      >
        <ListItemIcon>
          {getListItemClass(routes.MONITOR).length > 1 ? (
            <img src={MonitorIconWhite} alt='alert' />
          ) : (
            <img src={MonitorIconBlue} alt='alert' />
          )}
        </ListItemIcon>
        <ListItemText>Monitor</ListItemText>
      </ListItem>
    </List>
  );
};

export default LeftSidebar;
