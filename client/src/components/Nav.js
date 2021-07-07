import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem('token')){
      setShowLogout(true);
    }
  }, [showLogout]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="success" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={()=>{ history.push('/') }}>
            🍓fraise Market
          </Typography>
          <Button color="inherit" onClick={()=>{ history.push('/signin') }}>SignIn</Button>
          <Button color="inherit" onClick={()=>{ history.push('/signup') }}>SignUp</Button>
          <Button color="inherit" onClick={()=>{ history.push('/products/upload') }}>👉🏻</Button>
          <Button color="inherit" onClick={()=>{ history.push('/profile') }}>👤</Button>
          {
            showLogout &&
            <>
            <Button color="inherit" onClick={()=>
            { 
              setShowLogout(false);
              localStorage.setItem('token','');
            
            }}>Logout</Button>

            </>

            
          }


        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Nav;