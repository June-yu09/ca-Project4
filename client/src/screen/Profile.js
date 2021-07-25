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
import { useGetUser } from '../context/userContext';



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
    const token = useToken();
    const { userProduct, updateProducts, deleteProduct } = useProduct();
    const { getTheUser } = useGetUser();
    const [ user, setUser ] = useState();

    useEffect( async ()=>{
        updateProducts();
        const theUser = await getTheUser();
        setUser(theUser);
    }, []);

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
                        (userProduct && user) ?
                        <Card className={classes.card}>

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h5">🏞Uploaded Products🌌</Typography>
                            {
                                userProduct.map(product=>{
                                    return(
                                        <>
                                        <Card className={classes.card} key={ product._id }>
                                        <img src={'http://localhost:5000/products/images/'+product.image} />

                                        <Typography gutterBottom variant="h5" component="h3">{product.title} </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">▪️{product.price} $ </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">▪️{product.desc} </Typography>
                                        <Button onClick={()=>{
                                            deleteProduct(product._id, user._id);
                                            updateProducts();
                                        }}> ❌Delete </Button>

                                        </Card>
                                        <br></br>
                                        </>
                                    )
                                })
                            }
                        </CardContent>
                        </Card>:
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h5">❓</Typography>
                        </CardContent>


                    }
                    

                   
                </Grid>
            </Container>

            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                🤲🏻 2Hands Market ©
                </Typography>
            </footer>

        </div>
        </>
    )
}



export default Profile;