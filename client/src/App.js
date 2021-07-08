import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Switch } from 'react-router-dom';
import Home from './screen/Home';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import Products from './screen/Products';
import Upload from './screen/Upload';
import Profile from './screen/Profile';
import TokenProvider from './context/tokenContext';
import UserProvider from './context/userContext';





function App() {


  

  return (
    <>
    <TokenProvider>
    <UserProvider>
      <CssBaseline />
      <Nav />

      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/products/upload' component={Upload} />
      <Route exact path='/profile' component={Profile} />

      </Switch>
    </UserProvider>
    </TokenProvider>
    </>
  )
}

export default App;
