import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { useProduct } from '../context/productContext';
import { useToken } from '../context/tokenContext';
import { useGetUser } from '../context/userContext';



const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(1),
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
      paddingTop: '100%',
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    
  }))


const Profile = ()=>{
    let classes = useStyles();
    let history = useHistory();
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
                    ( userProduct && user ) ?
                    <>
                    <Grid item xs={12} sm={6} md={4}>

                        <Container maxWidth="sm" className={classes.heroContent}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h4" component="h3">User Profile</Typography>
                                <Typography gutterBottom variant="h5" component="h3">username: {user.name} </Typography>
                                <Typography gutterBottom variant="h5" component="h3">email: {user.email} </Typography>
                                <Typography gutterBottom variant="h5" component="h3">city: {user.city} </Typography>

                            </CardContent>
                        </Container>
                            
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="h5" component="h5">Uploaded Products</Typography>
                        {
                            userProduct.map(product=>{
                                return(
                                    
                                    <CardContent className={classes.cardContent} key={ product._id }>
                                    <img src={'http://localhost:5000/products/images/'+product.image} width={400} height={400} />

                                    <Typography gutterBottom variant="h5" component="h3">{product.title} </Typography>
                                    <Typography gutterBottom variant="h5" component="h3">▪️{product.price} $ </Typography>
                                    <Typography gutterBottom variant="h5" component="h3">▪️{product.desc} </Typography>
                                    <CardActions>
                                    <Button onClick={()=>{
                                        deleteProduct(product._id, user._id);
                                        updateProducts();
                                    }}> ❌Delete </Button>
                                    <Button onClick={()=>{
                                        history.push(`/productupdate/${product._id}`)
                                    }}> ❗️Modify </Button>
                                    </CardActions>

                                    
                                    <br></br>
                                    </CardContent>
                                )
                            })
                        }
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

                    
                    

                
                </Grid>
            </Container>

            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                🪴 Market ©
                </Typography>
            </footer>

        </div>
        </>
    )
}



export default Profile;