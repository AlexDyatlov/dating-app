import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/ui/navBar/navBar';
import Users from './layouts/users/users';
import Main from './layouts/main/main';
import Login from './layouts/login/login';
import ProtectedRoute from './components/common/protectedRoute/protectedRoute';
import LogOut from './layouts/logOut/logOut';
import AppLoader from './components/ui/hoc/appLoader';

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
}

export default App;
