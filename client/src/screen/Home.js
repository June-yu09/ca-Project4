import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { useProduct } from '../context/productContext.js';
import { useGetUser } from '../context/userContext';
import axios from 'axios';
import tree from '../tree.jpeg';
import serverURL from '../../config';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
      backgroundImage: `url(${tree})`,
      backgroundColor: '#A0E920'
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
    }
  }))


const Home = ()=>{
    let history = useHistory();
    let classes = useStyles();
    const { products, updateProducts } = useProduct();
    const { getTheUser } = useGetUser();
    const [ buttonToggle, setButton ] = useState(false);
    const [ user, setUser ] = useState();

    useEffect( async () => {
        updateProducts();
        const theUser = await getTheUser();
        setUser(theUser);
    },[buttonToggle]);

    return (<>
        <div>
            <CssBaseline />
            <div className={classes.heroContent}>
                <Container maxWidth="sm" >
                        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                    Welcome to
                    <br></br>
                    🪴 Market ©
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Good for our planet 🌏
                    </Typography>
                    
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    
                    {
                        products &&
                        <>{
                            products.map( product => {
                                let { title, price, uploader, _id } = product;
                                return (
                                    <>
                                    <Grid item xs={12} sm={6} md={4} key={uploader}>
                        
                                        <Card className={classes.card}>
                                        
                                            
                        
                                            <CardContent className={classes.cardContent} onClick={
                                                ()=> history.push(`/productdetail/${_id}`)}>
                                                
                                                {
                                                    product.image?
                                                    <>
                                                    <img src={serverURL+'/products/images/'+product.image} height={350} width={400} />
                                                    </>:
                                                    <>
                                                    <img src={serverURL+'/products/images/46c7789a4b05a6bb391627db7122a7de'} />
                                                    </>
                                                }
                                                
                                                    
                                                <Typography gutterBottom variant="h5" component="h2">{title} </Typography>
                                                <Typography>{price}$ </Typography>

                                            </CardContent>
                        
                                            <CardActions>
                                                {
                                                    user &&
                                                    (
                                                        <>
                                                        {
                                                        user.favorites.find(i=>i._id===product._id)?
                                                        <>
                                                        <Button size="small" color="primary" onClick={()=>{
                                                            axios.post(`${serverURL}/users/deletefavorite`, { productId: product._id, userId: user._id })
                                                            .then(response=>console.log(response))
                                                            .then(()=>{
                                                              setButton(!buttonToggle);
                                                            })
                                                        }}><Typography>💖</Typography></Button>
                                                        </>:
                                                        <>
                                                        <Button size="small" color="primary" onClick={()=>{
                                                            axios.post(`${serverURL}/users/addfavorite`, { productId: product._id, userId: user._id })
                                                            .then(response=>console.log(response))
                                                            .then(()=>{
                                                              setButton(!buttonToggle);
                                                            })
                                                        }}><Typography>🤍</Typography></Button>
                                                        </>
                                                        }
                                                        </>
                                                    )
                                                }
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    </>
                                )
                            })
                        }</>

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



export default Home;