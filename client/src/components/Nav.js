  import React, { useState, useEffect } from 'react';
  import { makeStyles, useTheme } from '@material-ui/core/styles';
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar';
  import Typography from '@material-ui/core/Typography';
  import Button from '@material-ui/core/Button';
  import MenuIcon from '@material-ui/icons/Menu';
  import clsx from 'clsx';
  import Drawer from '@material-ui/core/Drawer';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import List from '@material-ui/core/List';
  import Divider from '@material-ui/core/Divider';
  import IconButton from '@material-ui/core/IconButton';
  import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
  import ChevronRightIcon from '@material-ui/icons/ChevronRight';
  import ListItem from '@material-ui/core/ListItem';
  import ListItemText from '@material-ui/core/ListItemText';

  

  import { useHistory } from 'react-router-dom';
  import { useToken, useTokenUpdate } from '../context/tokenContext.js';
  import { useUser } from '../context/userContext.js';
  import axios from 'axios';

  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

  }));

  const Nav = () => {
    const classes = useStyles();
    const theme = useTheme();

    const history = useHistory();
    const myToken = useToken();
    const updateToken = useTokenUpdate();
    const user = useUser();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        

        <AppBar style={{ background: '#1FCA74' }} position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
          <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
          >
              <MenuIcon />
          </IconButton>

            <Typography variant="h4" className={classes.title} onClick={()=>{ history.push('/') }}>
            🪴 Market
            </Typography>
            {
              !myToken &&
              <>
              <Button color="inherit" onClick={()=>{ history.push('/signin') }}><Typography>SignIn</Typography></Button>
              <Button color="inherit" onClick={()=>{ history.push('/signup') }}><Typography>SignUp</Typography></Button>
              </>
            }

            {
              ( user && myToken ) &&
              <Typography variant="subtitle2">Welcome {user.name}</Typography>
            }
          </Toolbar>
        </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
              paper: classes.drawerPaper,
              }}
              >
                  <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                  </div>
                  
              <Divider />

              <List>
              
                  <ListItem button onClick={()=>{ history.push('/') }}>
                          <ListItemText primary='Home' />
                  </ListItem>
              </List>
              <Divider />
            
            {
              myToken &&
              <List>
              <ListItem>
                <IconButton aria-label="search" color="inherit" className={classes.menuButton} onClick={()=>{ history.push('/products/upload') }}>⬆️</IconButton>
              </ListItem>
              <ListItem>
              <IconButton aria-label="search" color="inherit" className={classes.menuButton} onClick={()=>{ history.push('/profile') }}>👤</IconButton>
              </ListItem>
              <ListItem>
              <IconButton aria-label="search" color="inherit" className={classes.menuButton} onClick={()=>{ history.push('/favorites') }}>💕</IconButton>
              </ListItem>
              <ListItem>

              <Button className={classes.menuButton} color="inherit" onClick={()=>{
                axios.post('http://localhost:5000/blacklists/add', { token: localStorage.getItem('token') })
                .then(response=>{
                  console.log(response);
                  alert("logged out!");
                })
                .then(()=>{
                  updateToken('');
                })
                .catch(err=>console.log(err))
              }}><Typography>Logout</Typography></Button>
              </ListItem>
              </List>
            }
            </Drawer>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                
            </main>

          
      </div>
    );
  }
  export default Nav;