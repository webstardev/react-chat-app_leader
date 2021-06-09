import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
import { Button as CustomButton } from '../components/Button';
import { authState } from '../atoms';
import { loginAPI } from '../apis';
import { routes } from '../constants';
import LogoTextSvg from '../assets/images/logo-text.svg';
import LeftArrorSvg from '../assets/images/left-arrow.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
  },
  loginWrapper: {
    maxWidth: 560,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoImg: {
    margin: '0 0 63.21px 0',
    width: '80%',
    maxWidth: '356px',
  },
  title: {
    margin: '0 0 58px 0',
    color: 'black',
  },
  loginTextField: {
    width: '100%',
    '& .MuiFormLabel-root': {
      display: 'none',
    },
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
      '&.Mui-focused': {
        borderColor: '#3C54B9',
      },
    },
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E6EDF6',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '28px',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3C54B9',
    },
    '& .MuiFormHelperText-contained': {
      marginLeft: 0,
    },
  },
  loginButton: {
    color: '#25374D',
    backgroundColor: '#D0DFF0',
    width: '100%',
    marginTop: '12px',
    height: 64,
    borderRadius: 32,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'center',
    textTransform: 'none',
    '& img': {
      width: 20,
      height: 18,
      marginLeft: 16,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const setAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: {
      value: '',
      errorMsg: '',
    },
    password: {
      value: '',
      errorMsg: '',
    },
  });

  const onLoginClick = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (formData.username.errorMsg.length > 0 && formData.password.errorMsg > 0)
      return;
    try {

      const res = await loginAPI({
        username: formData.username.value,
        password: formData.password.value,
      });
      const authInfo = {
        username: formData.username.value,
        role: res.id,
      };
      localStorage.setItem('auth', JSON.stringify(authInfo));
      setAuth(authInfo);
      history.push(routes.HOME);
    } catch (err) {
      console.log('Login Error');
    }

    setLoading(false);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.loginWrapper}>
        <img className={classes.logoImg} src={LogoTextSvg} alt='logo-text' />
        <Typography variant='h1' className={classes.title}>
          Let's Get You Started
        </Typography>
        <form noValidate autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.loginTextField}
                label=''
                type='text'
                placeholder='Username'
                value={formData.username.value}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    username: {
                      value: event.target.value,
                      errorMsg:
                        event.target.value.length === 0
                          ? 'Username is required.'
                          : '',
                    },
                  });
                }}
                variant='outlined'
                error={submitted && !!formData.username.errorMsg}
                helperText={submitted && formData.username.errorMsg}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.loginTextField}
                label=''
                type='password'
                placeholder='Password'
                value={formData.password.value}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    password: {
                      value: event.target.value,
                      errorMsg:
                        event.target.value.length > 1
                          ? ''
                          : 'Password is required.',
                    },
                  });
                }}
                variant='outlined'
                error={submitted && !!formData.password.errorMsg}
                helperText={submitted && formData.password.errorMsg}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomButton
                onClick={onLoginClick}
                className={classes.loginButton}
              >
                Login
                <img src={LeftArrorSvg} alt='left arrow' />
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
