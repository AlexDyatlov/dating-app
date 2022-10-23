import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/ui/navBar/navBar';
import Users from './layouts/users/users';
import Main from './layouts/main/main';
import Login from './layouts/login/login';
import { ProfessionProvider } from './hooks/useProfession';
import { QualityProvider } from './hooks/useQuality';

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </QualityProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
