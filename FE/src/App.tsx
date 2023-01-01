import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { getSession } from './auth/authenticationSlice';
import Login from './components/auth/Login';
import MainLayout from './layout/MainLayout';
import { RootState } from './store/store';
import PrivateRoute from './auth/private-route';

interface AppProps extends PropsFromRedux {}

const App = (props: AppProps) => {
  const { sessionHasBeenFetched, isAuthenticated, getSession } = props;
  useEffect(() => {
    getSession();
  }, []);

  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          {/* <PrivateRoute path="/" component={MainLayout}></PrivateRoute> */}
          <Route path="/" component={MainLayout}></Route>
        </Switch>
      </React.Fragment>
    </Router>
  );
};

// có thể dùng hooks thay connector => https://react-redux.js.org/tutorials/typescript-quick-start#use-typed-hooks-in-components

const mapState = ({ authentication }: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
  sessionHasBeenFetched: authentication.sessionHasBeenFetched,
});

const mapDispatch = {
  getSession,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
