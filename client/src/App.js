import { useContext, useEffect, useState } from 'react';
import Nav from './components/Nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Route, Switch } from 'react-router-dom';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import Products from './screen/Products';
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
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/products' component={Products} />

      </Switch>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography variant="h1">user</Typography>
          {/* <UserProvider> */}
          {
            users &&
            users.map(user=>{
              return(<>
              <Typography variant="h3">name:{ user.name }  </Typography>
              <Typography variant="h3">email:{ user.email }  </Typography>
              <Typography variant="h3">city:{ user.city }  </Typography>
              </>)
            })
          }
          {/* </UserProvider> */}

        </div>
      </Container>

    </>
  )
}

export default App;
