import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { User } from '../../model/Model';
import AuthService from '../../services/AuthService';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import NavBar from '../NavBar/NavBar';
import Profile from '../../pages/Profile/Profile';
import Spaces from '../../pages/Spaces/Spaces';
import CreateSpace from '../CreateSpace/CreateSpace';
import { DataService } from '../../services/DataService';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const authService: AuthService = new AuthService();
  const dataService: DataService = new DataService();

  const callbackSetUser = async (user: User) => {
    setUser(user);
    await authService.getAWSTempCreds(user.cognitoUser);
  };

  return (
    <div className='wrapper'>
      <Router>
        <div>
          <NavBar user={user} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login'>
              <Login
                callbackSetUser={callbackSetUser}
                authService={authService}
              />
            </Route>
            <Route exact path='/profile'>
              <Profile user={user} authService={authService} />
            </Route>
            <Route exact path='/spaces'>
              <Spaces dataService={dataService} />
            </Route>
            <Route exact path='/createSpace'>
              <CreateSpace dataService={dataService} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
