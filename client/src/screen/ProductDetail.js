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
import { useProduct } from '../context/productContext';

const useStyles = makeStyles((theme) => ({
    
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
    let history = useHistory();

    useEffect( async ()=>{
      const theProduct = await productDetail(productId);
      setProduct(theProduct);
    },[])


    return (<>
        <CssBaseline />
        <div>
            
        <Container className={classes.cardGrid} maxWidth="md">
                    
                    {
                        product &&
                        <>
        
                          <Card className={classes.card}>
                          
                              
          
                              <CardContent className={classes.cardContent}>
                                <Typography> 👤 <div onClick={()=>{
                                  history.push(`/userdetail/${product.uploader._id}`);
                                }}>{ product.uploader.name }</div> uploaded </Typography>

                                <Typography gutterBottom variant="h5" component="h2">{product.title} </Typography>
                                <Typography>▪️ { product.desc } </Typography>                        
                                <Typography>▪️ { product.price }$ </Typography>
                              </CardContent>
          
                              <CardActions>
                                  <Button size="small" color="primary"><Typography>💟</Typography></Button>
                                  <Button size="small" color="primary"><Typography>🛒</Typography></Button>
                              </CardActions>
                                
                          </Card>
                          <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                              <Typography>uploader1: this is good</Typography>
                              <Typography>uploader2: I like it too</Typography>
                              <Typography>uploader1: I'll buy this</Typography>
                            </CardContent>
                          </Card>
                      
                            
                        </>

                    }
                    

                   
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



export default ProductDetail;