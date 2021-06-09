import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIButton from '@material-ui/core/Button';

export const Button = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: '20px',
    minWidth: 100,
    minHeight: 40,
  },
  contained: {},
  outlined: {
    borderWidth: 2,
    // backgroundColor: "transparent",
    // color: "white",
    // border: "1px solid white",
    // "&:hover": {
    //   backgroundColor: "white",
    //   borderColor: "white",
    // },
  },
}))(MUIButton);
