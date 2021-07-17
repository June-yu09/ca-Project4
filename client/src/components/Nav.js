import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { useToken, useTokenUpdate } from '../context/tokenContext.js';
import { useUser } from '../context/userContext.js';
import axios from 'axios';

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
  const myToken = useToken();
  const updateToken = useTokenUpdate();
  const user = useUser();
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={()=>{ history.push('/') }}>
            🍓berry Market
          </Typography>
          {
            !myToken &&
            <>
            <Button color="inherit" onClick={()=>{ history.push('/signin') }}>SignIn</Button>
            <Button color="inherit" onClick={()=>{ history.push('/signup') }}>SignUp</Button>
            </>
          }

          {
            ( user && myToken ) &&
            <Typography variant="subtitle2">Welcome {user.name}</Typography>
          }
          
          {
            myToken &&
            <>
            <Button color="inherit" onClick={()=>{ history.push('/products/upload') }}>⬆️</Button>
            <Button color="inherit" onClick={()=>{ history.push('/profile') }}>👤</Button>
            <Button color="inherit" onClick={()=>{
              axios.post('http://localhost:5000/blacklists/add', { token: localStorage.getItem('token') })
              .then(response=>{
                console.log(response);
                alert("logged out!");
              })
              .then(()=>{
                updateToken('');
              })
              .catch(err=>console.log(err))
            }}>Logout</Button>
            </>
          }
          


        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Nav;