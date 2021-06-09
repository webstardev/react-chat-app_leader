import React, { useState } from 'react';
import {
  makeStyles,
  Box,
  TextField,
  Popover,
  IconButton,
  Paper,
  MenuItem,
} from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import SendButton from './SendButton';

import {
  QUESTION_TYPE,
  SENTENCE_DUMP_ANSWERS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(1)}px`,
  },
  controlWrapper: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #C8D5E4',
    paddingTop: 6,
  },
  dumpDropdownWrapper: {
    width: 313,
    height: 160,
    background: 'linear-gradient(180deg, #FFFFFF 0%, #DEDEDE 161.63%)',
    border: '1px solid #E3E8F2',
    overflow: 'hidden',
  },
  dumpMenuItem: {
    height: 40,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20',
    lineHeight: '24',
    '&:focus': {
      color: 'white',
      fontWeight: 'bold',
      background: 'linear-gradient(180deg, #3C54B9 0%, #283D98 100%)',
    },
  },
  iconButton: {},
  inputWrapper: {
    display: 'flex',
  },
  inputSentence: {
    flex: '1 1 auto',
  },
}));

const SentenceInput = ({ question, sendAnswer }) => {
  const classes = useStyles();
  const [sentence, setSentence] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onClickDump = (dumpAnswer) => {
    handleClose();
    sendAnswer(dumpAnswer);
  };

  const getSendButtonStatus = () => {
    if (question.type === QUESTION_TYPE.PHRASE) return sentence.length > 0;
    else if (question.type === QUESTION_TYPE.BUTTON) {
      if (sentence.length > 0) {
        let findOne = false;
        Object.keys(question.answer).forEach((item) => {
          if (!findOne)
            if (
              question.answer[item].text.toLowerCase() ===
              sentence.toLowerCase()
            ) {
              findOne = true;
            }
        });
        return findOne;
      } else return false;
    }
    return true;
  };

  const onKeyDownSentence = (event) => {
    if (event.key === 'Enter' && getSendButtonStatus()) {
      event.preventDefault();
      sendAnswer(sentence);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.controlWrapper}>
        <IconButton
          className={classes.iconButton}
          aria-describedby={id}
          variant='contained'
          color='primary'
          onClick={handleClick}
          disabled={question.type === QUESTION_TYPE.BUTTON}
        >
          <MessageIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Paper className={classes.dumpDropdownWrapper}>
            {SENTENCE_DUMP_ANSWERS.map((item, idx) => {
              return (
                <MenuItem
                  className={classes.dumpMenuItem}
                  onClick={() => {
                    onClickDump(item);
                  }}
                  key={idx}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Paper>
        </Popover>
      </Box>
      <Box className={classes.inputWrapper}>
        <TextField
          className={classes.inputSentence}
          multiline
          placeholder='Enter your message'
          rowsMax={4}
          value={sentence}
          onChange={(event) => {
            setSentence(event.target.value);
          }}
          onKeyDown={onKeyDownSentence}
          variant='outlined'
        />
        <SendButton
          disabled={!getSendButtonStatus()}
          onClick={() => {
            sendAnswer(sentence);
          }}
        />
      </Box>
    </Box>
  );
};

export default SentenceInput;
