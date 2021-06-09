import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  makeStyles,
  Box,
  Fab,
  Grow,
  Typography,
  IconButton,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SimpleBar from 'simplebar-react';

import ChatListContainer from './ChatListContainer';

import SentenceInput from './SendInput/SentenceInput';
import ImageInput from './SendInput/ImageInput';

import { getQuestionAPI } from '../../apis';
import { MESSAGE_OWNER, QUESTION_TYPE } from '../../constants';
import { formatChat } from '../../utils';
import ExpandSvg from '../../assets/images/expand-white.svg';
import ZoomInSvg from '../../assets/images/zoomin-white.svg';
import GradSvg from '../../assets/images/grad-blue.svg';

import { authState } from "../../atoms";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: 65,
    bottom: 65,
    height: 480,
    maxHeight: 'calc(100vh - 90px)',
    display: 'inline-block',
    flexDirection: 'column',
    overflow: 'visible',
    transition: 'width 0.5s',
    transitionTimingFunction: 'ease-in',
    zIndex: 1,
  },
  chatBotContainer: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    width: 424,
    height: '100%',
    overflow: 'hidden',
    transition: 'width 0.2s ease-in',
    maxWidth: 'calc(100vw - 20px)',
    borderRadius: 20,
    background: 'linear-gradient(180deg, #DEDEDE -7.42%, #FFFFFF 5.86%)',
  },
  statusWrapper: {
    position: 'relative',
    flex: '0 0 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `4px ${theme.spacing(1)}px 4px 25px`,
    '& .MuiTypography-h5': {
      fontFamily: 'Lato',
      fontWeight: 'bold',
      marginRight: 'auto',
      fontSize: 25,
      color: 'black',
      zIndex: 1,
    },
    '& .gradImg': {
      position: 'absolute',
      right: -150,
      top: 1,
      transition: 'right 0.2s ease-in',
      '&.expanded': {
        right: 0,
      },
    },
  },
  statusButton: {
    color: 'white',
    padding: '4px',
    marginLeft: `${theme.spacing(1)}px`,
  },
  chatBotWrapper: {
    padding: theme.spacing(1),
    width: '100%',
    flex: '1 1 100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    overflow: 'auto',
    '& > div': {
      boxSizing: 'border-box',
    },
  },
  scrollWrapper: {
    width: '100%',
    flex: '1 1 100%',
    overflow: 'hidden',
  },
  chatSimplebar: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
  },
  chatbotStickyFab: {
    position: 'fixed',
    bottom: 65,
    right: 65,
  },
}));

const Chatbot = () => {
  const classes = useStyles();

  const auth = useRecoilValue(authState);

  const [showChatBox, setShowChatBox] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [chatList, setChatList] = useState([]);

  const scrollableNodeRef = useRef();

  useEffect(() => {
    scrollableNodeRef.current.recalculate();
    updateChatList(null);
  }, []);

  const showReplyBox = () => {
    if (
      chatList.length > 0 && chatList[chatList.length - 1].owner === MESSAGE_OWNER.SENDER
    )
      return null;

    if (chatList.length === 0) {
      return <SentenceInput
        question={{
          type: QUESTION_TYPE.PHRASE,
          answer: '',
        }}
        sendAnswer={(answer) => {
          updateChatList({
            type: QUESTION_TYPE.PHRASE,
            content: answer,
          });
        }}
      />
    }

    const question = chatList[chatList.length - 1];
    if (
      question.type === QUESTION_TYPE.PHRASE ||
      question.type === QUESTION_TYPE.BUTTON
    )
      return (
        <SentenceInput
          question={chatList[chatList.length - 1]}
          sendAnswer={(answer) => {
            updateChatList({
              type: QUESTION_TYPE.PHRASE,
              content: answer,
            });
          }}
        />
      );
    // else if (question.type === QUESTION_TYPE.BUTTON)
    //   return (
    //     <ButtonInput
    //       question={question}
    //       sendAnswer={(answer) => {
    //         updateChatList({
    //           type: QUESTION_TYPE.BUTTON,
    //           content: answer,
    //         });
    //       }}
    //     />
    //   );
    else if (question.type === QUESTION_TYPE.IMAGE)
      return (
        <ImageInput
          sendAnswer={(answer) => {
            updateChatList({
              type: QUESTION_TYPE.IMAGE,
              content: answer,
            });
          }}
        />
      );
    else {
      return null;
    }
  };

  const updateChatList = (answer) => {
    if (!answer) return;
    const chatListTemp = chatList;
    if (answer)
      chatListTemp.push({
        owner: MESSAGE_OWNER.SENDER,
        ...answer,
      });
    setChatList([...chatListTemp]);
    gotoScrollBottom();

    getQuestionAPI({
      userType: auth.role,
      userId: 'user123',
      question: {
        type: "phrase",
        phrase: answer.content,
        attempt: 1
      }
    }).then((res) => {

      setChatList([
        ...chatListTemp,
        ...res.data.map(questionItem => {
          return {
            ...formatChat(questionItem),
            owner: MESSAGE_OWNER.RECEIVED,
          }
        })
      ]);
      gotoScrollBottom();
    });
  };

  const gotoScrollBottom = () => {
    setTimeout(() => {
      if (scrollableNodeRef && scrollableNodeRef.current) {
        scrollableNodeRef.current.getScrollElement().scrollTop =
          scrollableNodeRef.current.getContentElement().offsetHeight -
          scrollableNodeRef.current.getScrollElement().offsetHeight;
      }
    }, [200]);
  };

  return (
    <>
      <Grow in={showChatBox}>
        <Box className={classes.root}>
          <Box
            className={classes.chatBotContainer}
            style={{ width: expanded ? 640 : 424 }}
          >
            <Box className={classes.statusWrapper}>
              <img
                src={GradSvg}
                className={expanded ? 'gradImg expanded' : 'gradImg '}
                alt='grad'
              />
              <Typography variant='h5'>ChatBot</Typography>
              <IconButton
                className={classes.statusButton}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? (
                  <img src={ZoomInSvg} alt='zoom out' />
                ) : (
                  <img src={ExpandSvg} alt='expand' />
                )}
              </IconButton>
              <IconButton
                className={classes.statusButton}
                onClick={() => {
                  setShowChatBox(false);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
            <Box className={classes.chatBotWrapper}>
              <Box className={classes.scrollWrapper}>
                <SimpleBar
                  className={classes.chatSimplebar}
                  ref={scrollableNodeRef}
                >
                  <ChatListContainer
                    chatList={chatList}
                    sendAnswer={updateChatList}
                  ></ChatListContainer>
                </SimpleBar>
              </Box>
              {showReplyBox()}
            </Box>
          </Box>
        </Box>
      </Grow>
      <Grow in={!showChatBox}>
        <Fab
          className={classes.chatbotStickyFab}
          color='primary'
          aria-label='chatbot'
          onClick={() => {
            setShowChatBox(true);
          }}
        >
          <QuestionAnswerIcon />
        </Fab>
      </Grow>
    </>
  );
};

export default Chatbot;

// temp code for api
const getQuestion = (nIndex) => {
  const questionList = [
    {
      type: 'sentence',
      content: 'This is chatbot.',
    },
    // {
    //   type: 'button',
    //   content: 'Do you want to approve ?',
    //   answer: {
    //     b1: { text: 'Yes', trigger_text: 'approve' },
    //     b2: { text: 'No', trigger_text: 'disapprove' },
    //   },
    // },
    // {
    //   type: 'table',
    //   content: {
    //     t1: {
    //       title: 'table_name',
    //       subtitle: 'a descriptive name',
    //       primary_key: 'id',
    //       attributes: ['item_name', 'item_count', 'item_price'],
    //       item_list: [
    //         [1, 'apple', 10, 5],
    //         [2, 'banana', 20, 4],
    //       ],
    //       url: 'http:',
    //     },
    //   },
    // },
    // {
    //   type: 'image',
    //   content: 'What is your favourite image?',
    //   // content: {
    //   //   p1: { name: "pic_name", sub_name: "a descriptive name", path: "path" },
    //   // },
    // },
    // {
    //   type: 'list',
    //   content: 'Select List item',
    //   answer: {
    //     l1: {
    //       name: 'item_name1',
    //       sub_name: 'a descriptive name under item_name1',
    //       url: '/monitor',
    //     },
    //     l2: {
    //       name: 'item_name2',
    //       sub_name: 'a descriptive name under item_name2',
    //       url: '/alerts',
    //     },
    //   },
    // },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(questionList[nIndex]);
    }, 1000);
  });
};
