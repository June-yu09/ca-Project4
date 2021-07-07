import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '100%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    circle: {
        display: 'flex',
        '& > * + *': {
        marginLeft: theme.spacing(2),
    },
    }
  }))


const Products = ()=>{
    let classes = useStyles();
    let isLoading = true;
    const [userData, setUserData] = useState();
    const token = "bearer " + localStorage.getItem('token');
    

    const fetchData = ()=>{
        axios.get("http://localhost:5000/users/profile", {
            headers: { "Authorization": token }
        })
        .then(response=>{
            console.log(response);
            setUserData(response.data);
        })
        
    }
    useEffect(()=>{
        fetchData();
    },[]);



    return (<>
        <CssBaseline />
        <div>
            
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {/* {
                    isLoading?
                    <>
                    <div className={classes.circle}>
                    <CircularProgress />
                    </div>
                    <Typography component='h1' variant='h1'> Loading </Typography>
                    </>:
                    <> */}
                    {
                    userData &&
                    <>
                    <Grid item xs={12} sm={6} md={4}>

                        <Card className={classes.card}>



                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h4">name: {userData.name} </Typography>
                                <Typography gutterBottom variant="h5" component="h4">email: {userData.email} </Typography>
                                <Typography gutterBottom variant="h5" component="h4">city: {userData.city} </Typography>

                            </CardContent>

                            
                        </Card>
                    </Grid>
                    </>
                    }
                    {/* </>
                    } */}

                   
                </Grid>
            </Container>

            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    딸기마켓
                </Typography>
            </footer>

        </div>
        </>
    )
}



export default Products;