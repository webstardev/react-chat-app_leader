import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: `${theme.spacing(1)}px`,
    minWidth: 'auto',
    '& .MuiButton-startIcon': {
      margin: 0,
    },
  },
}));

const SendButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant='contained'
      color='primary'
      startIcon={<SendIcon />}
      {...props}
    ></Button>
  );
};

export default SendButton;
