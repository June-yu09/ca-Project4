import React from 'react';
import Nav from './components/Nav';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Switch } from 'react-router-dom';
import Home from './screen/Home';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import ProductDetail from './screen/ProductDetail';
import Upload from './screen/Upload';
import Profile from './screen/Profile';
import UserDetail from './screen/UserDetail';
import Favorites from './screen/Favorites';
import TokenProvider from './context/tokenContext';
import UserProvider from './context/userContext';
import ProductProvider from './context/productContext';
import ProductUpload from './screen/ProductUpdate'
import ProductUpdate from './screen/ProductUpdate';


function App() {


  

  return (
    <>
    <TokenProvider>
    <UserProvider>
    <ProductProvider>
      <CssBaseline />
      <Nav />

      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/productdetail/:productId' component={ProductDetail} />
      <Route exact path='/products/upload' component={Upload} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/userdetail/:userId' component={UserDetail} />
      <Route exact path='/favorites' component={Favorites} />
      <Route exact path='/productupdate/:productId' component={ProductUpdate} />



      </Switch>
    </ProductProvider>
    </UserProvider>
    </TokenProvider>
    </>
  )
}

export default App;
