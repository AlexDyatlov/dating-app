import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/ui/navBar/navBar';
import Users from './layouts/users/users';
import Main from './layouts/main/main';
import Login from './layouts/login/login';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/users/:userId?' component={Users} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/' exact component={Main} />
        <Redirect to='/' />
      </Switch>
    </>
  );
}

export default App;
