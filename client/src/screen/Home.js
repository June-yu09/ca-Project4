import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
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
import { useProduct } from '../context/productContext.js';


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

    useEffect(()=>{
        updateProducts();
    },[]);

    return (<>
        <CssBaseline />
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm" >
                        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                    Welcome to 🤲🏻 2Hands Market ©
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    🖐🏻 second hands items help our planet 🌏
                    </Typography>
                    
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    
                    {
                        products &&
                        <>{
                            products.map(product =>{
                                let { title, desc, price, uploader, _id } = product;
                                return (
                                    <>
                                    <Grid item xs={12} sm={6} md={4} key={uploader}>
                        
                                        <Card className={classes.card}>
                                        
                                            
                        
                                            <CardContent className={classes.cardContent} onClick={
                                                ()=>
                                                history.push(`/productdetail/${_id}`)
                                            }>
                                                <Typography gutterBottom variant="h5" component="h2">{title} </Typography>
                                                <Typography>▪️ { desc } </Typography>                        
                                                <Typography>▪️ {price}$ </Typography>

                                            </CardContent>
                        
                                            <CardActions>
                                                <Button size="small" color="primary"><Typography>💟</Typography></Button>
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
                🤲🏻 2Hands Market ©
                </Typography>
            </footer>

        </div>
        </>
    )
}



export default Home;