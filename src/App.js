import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/ui/navBar/navBar';
import Users from './layouts/users/users';
import Main from './layouts/main/main';
import Login from './layouts/login/login';
import { ProfessionProvider } from './hooks/useProfession';
import { QualityProvider } from './hooks/useQuality';
import AuthProvider from './hooks/useAuth';
import LoginProvider from './hooks/useLogin';

function App() {
  return (
    <>
      <AuthProvider>
        <LoginProvider>
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
        </LoginProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default App;
