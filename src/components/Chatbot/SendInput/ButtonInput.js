import React from "react";

import { makeStyles, Box, Button } from "@material-ui/core";
import SimpleBar from "simplebar-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: `${theme.spacing(1)}px`,
    maxHeight: "150px",
  },
  answerButton: {
    margin: `4px 0`,
    width: "100%",
  },
}));

const ButtonInput = ({ question, sendAnswer }) => {
  const classes = useStyles();
  return (
    <SimpleBar className={classes.root}>
      {Object.keys(question.answer).map((item, idx) => {
        return (
          <Button
            className={classes.answerButton}
            variant="contained"
            color="primary"
            onClick={() => {
              sendAnswer(question.answer[item].text);
            }}
            key={idx}
          >
            {question.answer[item].text}
          </Button>
        );
      })}
    </SimpleBar>
  );
};

export default ButtonInput;
