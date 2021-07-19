import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import { useProduct } from '../context/productContext';



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


const UserDetail = ()=>{
    const classes = useStyles();
    const { userId } = useParams();
    const { getUser } = useGetUser();
    const [ user, setUser ] = useState();
    const history= useHistory();

    useEffect( async () => {
        const theUser = await getUser(userId);
        setUser(theUser);
        console.log('what',theUser);
    }, []);

    return (<>
        <CssBaseline />
        <div>
            
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    { user && 
                    <>
                    <Grid item xs={12} sm={6} md={4}>
                        
                        <Card className={classes.card}>



                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h5">User </Typography>
                                <Typography gutterBottom variant="h5" component="h3">name: {user.name} </Typography>
                                <Typography gutterBottom variant="h5" component="h3">city: {user.city} </Typography>

                            </CardContent>

                            
                        </Card>
                    </Grid>
                    
                    
                        <Card className={classes.card}>

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h5">Uploaded Products</Typography>
                            {
                                user.products.map(product=>{
                                    return(
                                        <>
                                        <Card className={classes.card} key={ product._id } onClick={()=>{
                                            history.push(`/productdetail/${product._id}`);
                                        }}>

                                        <Typography gutterBottom variant="h5" component="h3">{product.title} </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">▪️{product.price} $ </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">▪️{product.desc} </Typography>
                

                                        </Card>
                                        <br></br>
                                        </>
                                    )
                                })
                            }
                        </CardContent>
                        </Card>
                    </>
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



export default UserDetail;