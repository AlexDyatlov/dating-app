import React from 'react';
import { Route, Switch } from 'react-router';

import NavBar from './components/navBar/navBar';
import Users from './components/users/users';
import Main from './layouts/main/main';
import Login from './layouts/login/login';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userPageId?' component={Users} />
      </Switch>
    </>
  );
}

export default App;
