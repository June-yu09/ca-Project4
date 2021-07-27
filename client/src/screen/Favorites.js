import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { useGetUser } from '../context/userContext';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(8, 0, 6),
      backgroundColor: '#A0E920'
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
      paddingTop: '100%',
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
    },
    
  }))


const Favorites = () => {
    const classes = useStyles();
    const history= useHistory();

    const { getTheUser } = useGetUser();
    const [ user, setUser ] = useState();
    const [ toggleButton, setToggle ] = useState(false);

    useEffect( async () => {
        const theUser = await getTheUser();
        setUser(theUser);
    }, [toggleButton]);

    return (<>
        <CssBaseline />
        <div>
            
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    { user &&
                    <>
                        <Grid item xs={12} sm={6} md={4}>

                        <div className={classes.heroContent}>
                                        
                            <Container maxWidth="sm" >
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" align="center" component="h5">{user.name}'s Favorites</Typography>
                                </CardContent>   
                            </Container>
                        </div>
                        </Grid>
                    
                        <Card className={classes.card}>

                            {
                                user.favorites && 
                                (user.favorites.map(favorite=>{
                                    return(
                                        <>
                                        <CardContent className={classes.cardContent} key={ favorite._id } onClick={()=>{
                                            history.push(`/productdetail/${favorite._id}`);
                                        }}>
                                        <img src={'http://localhost:5000/products/images/'+favorite.image} width={150} height={150}/>
                                        <Typography gutterBottom variant="h5" component="h3">{favorite.title} </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">▪️{favorite.price} $ </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Button size="small" color="primary" onClick={()=>{
                                                axios.post("http://localhost:5000/users/deletefavorite", { productId: favorite._id, userId: user._id })
                                                .then(response=>console.log(response))
                                                .then(()=>setToggle(!toggleButton))
                                                
                                            }}><Typography>❌</Typography></Button>
                                        </CardActions>

                                        <hr></hr>
                                        </>
                                    )
                                })
                                )
                            }
                        </Card>
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



export default Favorites;