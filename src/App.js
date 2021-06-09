import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';

import theme from './theme';
import { routes } from './constants';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import Home from './pages/Home';
import Alerts from './pages/Alerts';
import Analyze from './pages/Analyze';
import Monitor from './pages/Monitor';
import Search from './pages/Search';
import Setting from './pages/Setting';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatbot from './components/Chatbot';

import { authState } from './atoms';

const App = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const localAuth = localStorage.getItem('auth');

  useEffect(() => {
    if (!!localAuth) {
      setAuth({
        ...JSON.parse(localAuth),
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path={routes.LOGIN}
            component={Login}
            redirectTo={Home}
          />
          <PublicRoute exact path={routes.SIGNUP} component={Signup} />
          <PublicRoute exact path={routes.HOME} component={Home} />
          <PublicRoute exact path={routes.ALERTS} component={Alerts} />
          <PublicRoute exact path={routes.ANALYZE} component={Analyze} />
          <PublicRoute exact path={routes.MONITOR} component={Monitor} />
          <PublicRoute exact path={routes.SETTING} component={Setting} />
          <PublicRoute exact path={routes.SEARCH} component={Search} />
        </Switch>
        {!!auth && <Chatbot />}
      </Router>
    </ThemeProvider>
  );
};

export default App;
