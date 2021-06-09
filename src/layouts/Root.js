import React from 'react';

import { makeStyles, Box } from '@material-ui/core';

import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import { HEADER_HEIGHT } from '../constants/layout';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    margin: 0,
    padding: `${HEADER_HEIGHT}px 0 0 0`,
    boxSizing: 'border-box',
  },
}));

const RootLayout = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      {props.children}
    </Box>
  );
};

export default RootLayout;
