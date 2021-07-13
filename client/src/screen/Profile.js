import React, { useEffect, useState } from 'react';
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
import { useUser } from '../context/userContext';
import { useProduct } from '../context/productContext';
import { useToken } from '../context/tokenContext';



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


const Profile = ()=>{
    let classes = useStyles();
    
    const user = useUser();
    const token = useToken();
    const { userProduct } = useProduct();

    return (<>
        <CssBaseline />
        <div>
            
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    
                    {
                    ( token && user ) ?
                    <>
                    <Grid item xs={12} sm={6} md={4}>

                        <Card className={classes.card}>



                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h5">User </Typography>

                                <Typography gutterBottom variant="h5" component="h3">name: {user.name} </Typography>
                                <Typography gutterBottom variant="h5" component="h3">email: {user.email} </Typography>
                                <Typography gutterBottom variant="h5" component="h3">city: {user.city} </Typography>

                            </CardContent>

                            
                        </Card>
                    </Grid>
                    </>:
                    <>
                    <div className={classes.circle}>
                    <CircularProgress />
                    </div>
                    <Typography component='h1' variant='h4'> Please LogIn </Typography>
                    </>
                    }
                    {
                        (userProduct) ?
                        <Card className={classes.card}>

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h5">Uploaded Products</Typography>
                            {
                                userProduct.map(product=>{
                                    return(
                                        <>
                                        <Card className={classes.card}>

                                        <Typography gutterBottom variant="h5" component="h3">title: {product.title} </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">price: {product.price} $ </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">description: {product.desc} </Typography>
                                        </Card>
                                        <br></br>
                                        </>
                                    )
                                })
                                //BUG after upload when I come to this page, I cannot see the change
                            }
                        </CardContent>
                        </Card>:
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h5">You didn't upload yet!</Typography>
                        </CardContent>


                    }
                    

                   
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



export default Profile;