import { useContext, useEffect, useState } from 'react';
import Nav from './components/Nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Home from './screen/Home';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import Products from './screen/Products';
import Upload from './screen/Upload';
import Profile from './screen/Profile';
import axios from 'axios';

// import { UserProvider, useUsers } from './context/userContext';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

function App() {

  const classes = useStyles();
  // const users = useUsers();
  let [users, setUsers] = useState([]);
    const fetchUser = async () => {
        let response = await axios.get('http://localhost:5000/users/all');
        setUsers(response.data);
      }
  useEffect(()=>{
      fetchUser();
  },[])

  return (
    <>
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

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {/* <UserProvider> */}
          {/* {
            users &&
            users.map(user=>{
              return(<>
              <Typography variant="h3">name:{ user.name }  </Typography>
              <Typography variant="h3">email:{ user.email }  </Typography>
              <Typography variant="h3">city:{ user.city }  </Typography>
              </>)
            })
          } */}
          {/* </UserProvider> */}

        </div>
      </Container>

    </>
  )
}

export default App;
