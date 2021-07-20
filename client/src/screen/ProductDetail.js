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
import { useGetUser } from '../context/userContext';
import axios from 'axios';

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
    let history = useHistory();

    let { productId } = useParams();
    let [ product, setProduct ] = useState();
    let { productDetail } = useProduct();
    let { getTheUser } = useGetUser();

    let [ comment, setComment ] = useState();
    let [ allComments, setAllComments ] = useState();
    let [ buttonToggle, setButton ] = useState(false);
    let [ user, setUser ] = useState();

    useEffect( async ()=>{
      const theUser = await getTheUser();
      setUser(theUser);
      const theProduct = await productDetail(productId);
      setProduct(theProduct);
      axios.get(`http://localhost:5000/comments/${productId}`)
      .then(response=>{
        setAllComments(response.data);
      })
    },[buttonToggle]);

    let handleSubmit = e => {
      e.preventDefault();
      axios.post('http://localhost:5000/comments/create', { desc: comment, uploader: user._id, productId: product._id })
      .then(response=>console.log(response))
    }


    return (<>
        <CssBaseline />
        <div>
            
        <Container className={classes.cardGrid} maxWidth="md">
                    
                    {
                        product &&
                        <>
        
                          <Card className={classes.card}>
                          
                              
          
                              <CardContent className={classes.cardContent}>
                                <Typography onClick={()=>{
                                  history.push(`/userdetail/${product.uploader._id}`);
                                }}> 👤{ product.uploader.name } </Typography>

                                <Typography gutterBottom variant="h5" component="h2">{product.title} </Typography>
                                <Typography>▪️ { product.desc } </Typography>                        
                                <Typography>▪️ { product.price }$ </Typography>

                              </CardContent>
                              {
                                user && (
                                  user.favorites.includes(product._id) ?
                                  (
                                    <>
                                    <CardActions>
                                      <Button size="small" color="primary" onClick={()=>{
                                        axios.post("http://localhost:5000/users/deletefavorite", { productId: product._id, userId: user._id })
                                        .then(response=>console.log(response))
                                        setButton(!buttonToggle);
                                      }} ><Typography>💖</Typography></Button>
                                    </CardActions>
                                    </>
                                  ):
                                  (
                                    <>
                                    <CardActions>
                                      <Button size="small" color="primary" onClick={()=>{
                                        axios.post("http://localhost:5000/users/addfavorite", { productId: product._id, userId: user._id })
                                        .then(response=>console.log(response))
                                        setButton(!buttonToggle);
                                      }} ><Typography>🤍</Typography></Button>
                                    </CardActions>
                                    </>
                                  )
                                )
                              }
                              
                              
                                
                          </Card>
                          {
                            allComments && (
                              allComments.map((aComment)=>{
                                return (
                                <CardContent className={classes.cardContent} key={aComment._id}>
                                  <Typography> { aComment.uploader.name } : </Typography>
                                  <Typography> { aComment.desc } </Typography>
                                  <Button size="small" color="primary" onClick={()=>{
                                    const commentId = aComment._id;
                                    axios.get(`http://localhost:5000/comments/delete/${commentId}`)
                                    .then(response=>console.log(response, 'deleted successfully'))
                                    .catch(err=>console.log(err))
                                    setButton(!buttonToggle);

                                  }}>❌Delete</Button>


                                </CardContent>

                                )
                              })
                              
                            )
                          }
                          

                          <form onSubmit={e=>{
                            handleSubmit(e);
                            setButton(!buttonToggle);
                            setComment('');
                          }}>
                            <label>comment</label>
                            <br />
                            <input name='comment' type='text' value={comment} onChange={e=>{
                              setComment(e.target.value);
                            }} />
                            <button>Submit</button>

                          </form>
                      
                            
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