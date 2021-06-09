import React from 'react';

import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Box,
  Grow,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import SimpleBar from 'simplebar-react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { MESSAGE_OWNER, QUESTION_TYPE } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',

    '& .chat': {
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(1)}px 0`,
      fontFamily: 'Lato',

      '&.left': {
        paddingRight: '20%',
        alignItems: 'flex-start',
        fontSize: 15,
        fontWeight: 500,
        lineHeight: '18px',
        '& .chat-content': {
          textAlign: 'left',
          color: 'white',
          backgroundColor: '#3C54B9',
          borderRadius: '0px 10px 10px 10px',
          padding: `10px 25px 10px 20px`,
        },
      },
      '&.right': {
        paddingLeft: '20%',
        alignItems: 'flex-end',
        '& .chat-content': {
          textAlign: 'right',
          color: '#000000',
          background: '#EFF1F8',
          borderRadius: '0px 10px 10px 10px',
          padding: `10px 20px 10px 25px`,
        },
      },
      '& .chat-content': {
        display: 'inline-flex',
        flexDirection: 'column',
        maxWidth: '100%',
        boxShadow: `rgb(0 0 0 / 20%) 0px 3px 1px -2px, 
       rgb(0 0 0 / 14%) 0px 2px 2px 0px, 
       rgb(0 0 0 / 12%) 0px 1px 5px 0px`,
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        '&.image-content': {
          padding: '2px !important',
          borderRadius: 4,
          '& img': {
            width: '100%',
            borderRadius: 4,
          },
          '& .MuiTypography-subtitle2': {
            fontFamily: 'Lato',
            fontSize: 12,
            margin: '4px 0 0 0',
          },
        },
      },
    },
  },
  buttonsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  answerButton: {
    margin: 4,
    border: '2px solid #3C54B9 !important',
    fontWeight: 600,
  },
  listAnswerItemWrapper: {
    display: 'flex',
    height: 'auto',
    maxHeight: '200px',
    marginRight: '20%',
  },
  listAnswerItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    background: '#EFF1F8',
    padding: '17px 25px 20px 20px',
    borderRadius: 0,
    borderBottom: '1px solid white',
    '&:hover': {
      borderLeft: '4px solid #3C54B9',
    },
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      '& .list-item-content-wrapper': {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        '& .MuiTypography-subtitle1': {
          fontFamily: 'Lato',
          fontWeight: 'bold',
          fontSize: '15px',
          lineHeight: '18px',
          color: '#3C54B9',
        },
        '& .MuiTypography-subtitle2': {
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '14px',
          color: '#9FA6C5',
          magin: '4px 0 0 0',
        },
      },
      '& .list-item-arrow-btn': {
        flex: '0 0 24px',
        width: 24,
        height: 24,
        backgroundColor: 'white',
      },
    },
  },
  listAnswerItemActive: {
    borderLeft: '4px solid #3C54B9',
  },
}));

const ChatListContainer = ({ chatList, sendAnswer }) => {
  const classes = useStyles();
  const history = useHistory();

  const renderContent = (messageItem) => {
    if (!messageItem) return null;
    else if (messageItem.type === QUESTION_TYPE.IMAGE) {
      if (messageItem.owner === MESSAGE_OWNER.RECEIVED)
        return <Box className='chat-content'>{messageItem.content}</Box>;
      else {
        return (
          <Box className={'chat-content image-content'}>
            <img
              src={messageItem.content.imgSrc}
              alt={messageItem.content.name}
            />
          </Box>
        );
      }
    } else if (messageItem.type === QUESTION_TYPE.LIST) {
      const answerList = [];
      return <Box className='chat-content'>{messageItem.content}</Box>;
    } else {
      return <Box className='chat-content'>{messageItem.content}</Box>;
    }
  };

  const renderAnswerBtns = (messageItem, nIndex) => {
    const buttonArr = [];
    Object.keys(messageItem.answer).forEach((item) => {
      buttonArr.push(
        <Button
          className={classes.answerButton}
          variant='outlined'
          color='primary'
          size='small'
          key={item}
          onClick={() => {
            if (nIndex === chatList.length - 1)
              sendAnswer({
                type: QUESTION_TYPE.BUTTON,
                content: messageItem.answer[item].text,
              });
          }}
        >
          {messageItem.answer[item].text}
        </Button>
      );
    });

    return (
      <Grow in={true}>
        <Grid item className={classes.buttonsWrapper}>
          {buttonArr}
        </Grid>
      </Grow>
    );
  };

  const renderListItem = (messageItem, nIndex) => {
    const listArr = [];

    Object.keys(messageItem.answer).forEach((answerKey) => {
      const listRootClass = [classes.listAnswerItem];
      if (
        nIndex < chatList.length - 1 &&
        chatList[nIndex + 1].type === QUESTION_TYPE.LIST &&
        chatList[nIndex + 1].owner === MESSAGE_OWNER.SENDER &&
        chatList[nIndex + 1].content === answerKey
      )
        listRootClass.push(classes.listAnswerItemActive);

      listArr.push(
        <Button
          className={listRootClass.join(' ')}
          key={answerKey}
          onClick={() => {
            sendAnswer({
              type: QUESTION_TYPE.LIST,
              content: answerKey,
            });
            history.push(messageItem.answer[answerKey].url);
          }}
        >
          <Box className='list-item-content-wrapper'>
            <Typography variant='subtitle1'>
              {messageItem.answer[answerKey].name}
            </Typography>
            <Typography variant='subtitle2'>
              {messageItem.answer[answerKey].sub_name}
            </Typography>
          </Box>
          <IconButton className='list-item-arrow-btn'>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Button>
      );
    });
    return (
      <SimpleBar className={classes.listAnswerItemWrapper}>{listArr}</SimpleBar>
    );
  };

  return (
    <Grid container className={classes.root}>
      {chatList.map((item, idx) => {
        if (
          item.owner === MESSAGE_OWNER.SENDER &&
          item.type === QUESTION_TYPE.LIST
        )
          return null;
        const itemClass = ['chat'];

        if (item.owner === MESSAGE_OWNER.RECEIVED) {
          itemClass.push('left');
        } else {
          itemClass.push('right');
        }

        return (
          <React.Fragment key={idx}>
            <Grow in={true}>
              <Grid item className={itemClass.join(' ')} xs={12}>
                {renderContent(item)}
              </Grid>
            </Grow>
            {item.owner === MESSAGE_OWNER.RECEIVED &&
              item.type === QUESTION_TYPE.BUTTON &&
              idx === chatList.length - 1 && <>{renderAnswerBtns(item, idx)}</>}
            {item.owner === MESSAGE_OWNER.RECEIVED &&
              item.type === QUESTION_TYPE.LIST && (
                <>{renderListItem(item, idx)}</>
              )}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default ChatListContainer;
