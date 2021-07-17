import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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


const ProductDetail = ()=>{
    let classes = useStyles();
    let { productId } = useParams();
    let [ product, setProduct ] = useState();
    let { productDetail } = useProduct();

    useEffect( async ()=>{
      const theProduct = await productDetail(productId);
      console.log('returned product form response.data',theProduct);
      setProduct(theProduct);
    },[])


    return (<>
        <CssBaseline />
        <div>
            
        <Container className={classes.cardGrid} maxWidth="md">
                    
                    {
                        product &&
                        <>{
                            
                                
                                    <>
                        
                                        <Card className={classes.card}>
                                        
                                            
                        
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">{product.title} </Typography>
                                                <Typography>▪️ { product.desc } </Typography>                        
                                                <Typography>▪️ { product.price }$ </Typography>
                                                <Typography>Uploader { product.uploader }$ </Typography>

                                            </CardContent>
                        
                                            <CardActions>
                                                <Button size="small" color="primary"><Typography>💟</Typography></Button>
                                                <Button size="small" color="primary"><Typography>🛒</Typography></Button>
                                            </CardActions>
                                        </Card>
                                    </>
                            
                        }</>

                    }
                    

                   
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



export default ProductDetail;