import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import NavBar from './components/ui/navBar/navBar';
import Users from './layouts/users/users';
import Main from './layouts/main/main';
import Login from './layouts/login/login';
import { ProfessionProvider } from './hooks/useProfession';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute/protectedRoute';
import LogOut from './layouts/logOut/logOut';
import { loadQualitiesList } from './store/qualities';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default App;
