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

  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="success" aria-label="menu">
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
            myToken &&
            <>
            <Button color="inherit" onClick={()=>{ history.push('/products/upload') }}>⬆️</Button>
            <Button color="inherit" onClick={()=>{ history.push('/profile') }}>👤</Button>
            <Button color="inherit" onClick={()=>{updateToken('')}}>Logout</Button>

            </>

            
          }


        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Nav;