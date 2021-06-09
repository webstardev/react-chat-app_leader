import React, { useState } from "react";

import {
  makeStyles,
  Box,
  TextField,
  Popover,
  Button,
  IconButton,
  Paper,
  MenuList,
  MenuItem,
} from "@material-ui/core";

import SendButton from "./SendButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(1)}px`,
  },
  fileContentWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 4,
    fontSize: 12,
  },
  controlWrapper: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    "& .MuiButtonBase-root": {
      flex: "0 1 100%",
    },
  },
}));

const ImageInput = ({ sendAnswer }) => {
  const classes = useStyles();
  const [imgFile, setImgFile] = useState(null);

  const onFileChange = (event) => {
    if (!!event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImgFile({
          name: file.name,
          imgSrc: reader.result,
        });
      };
    }
  };

  return (
    <Box className={classes.root}>
      {!!imgFile && (
        <Box className={classes.fileContentWrapper}>{imgFile.name}</Box>
      )}

      <Box className={classes.controlWrapper}>
        <Button color="primary" variant="contained" component="label">
          Select File
          <input
            type="file"
            hidden
            onChange={onFileChange}
            accept="image/png, image/gif, image/jpeg"
          />
        </Button>
        <SendButton
          onClick={() => {
            sendAnswer(imgFile);
          }}
          disabled={!imgFile}
        />
      </Box>
    </Box>
  );
};

export default ImageInput;
