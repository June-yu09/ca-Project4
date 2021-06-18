import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


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
  let [users, setUsers] = useState([]);

  const fetchUser = async () => {
    let response = await axios.get('http://localhost:5000/users/all');
    setUsers(response);
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <>
      <CssBaseline />
      <Nav />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography variant="h1">user</Typography>

          {
            users.length!==0 &&
            users.map(user=>{
              return(<>
              <Typography variant="h3">name: { user.name }  </Typography>
              <Typography variant="h3">email: { user.email }  </Typography>
              <Typography variant="h3">city: { user.city }  </Typography>
              </>)
            })
          }

        </div>
      </Container>

    </>
  )
}

export default App;
