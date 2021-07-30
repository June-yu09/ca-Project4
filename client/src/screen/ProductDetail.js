import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { useProduct } from '../context/productContext';
import { useGetUser } from '../context/userContext';
import axios from 'axios';
import serverURL from '../../config';

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
    heroContent: {
      padding: theme.spacing(8, 0, 6),
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
    let [ comment2, setComment2 ] = useState();
    let [ allComments, setAllComments ] = useState();
    let [ buttonToggle, setButton ] = useState(false);
    let [ user, setUser ] = useState();
    let [ modifyId, setModifyId ] = useState([]);
    let [ showFavorite, setFavorite ] = useState(true);
    let [ paintingUrl, setPainting ] = useState('');
    let [ token, setToken ] = useState();
  

    useEffect( async ()=>{
      const theToken = await localStorage.getItem('token');
      setToken(theToken);
      const theUser = await getTheUser();
      setUser(theUser);
      const theProduct = await productDetail(productId);
      setProduct(theProduct);
      setPainting(serverURL+'/products/images/'+theProduct.image);

      axios.get(`${serverURL}/comments/${productId}`)
      .then(response=>{
        setAllComments(response.data);
      })
    
      if(theUser.favorites.find(i=>i._id===theProduct._id)){
        setFavorite(true);
      }else{
        setFavorite(false);
      }

      
    },[buttonToggle]);

    let handleSubmit = e => {
      e.preventDefault();
      axios.post(`${serverURL}/comments/create`, { desc: comment, uploader: user._id, productId: product._id })
      .then(response=>console.log(response))
    }

    let handleModifySubmit = (e, commentId) => {
      e.preventDefault();
      console.log('new comment and commentId', comment2, commentId);
      axios.post(`${serverURL}/comments/update`, { newDesc: comment2, commentId: commentId })
      .then(response=>console.log(response))
    }


    return (<>
        <CssBaseline />
        <div>
            
        <Container className={classes.cardGrid} maxWidth="md">

          {
            user ?
            <>
            {
                product &&
                <>

                  <Card className={classes.card}>
                  
                      
  
                      <CardContent className={classes.cardContent}>
                        <Typography onClick={()=>{
                          history.push(`/userdetail/${product.uploader._id}`);
                        }}> 👤{ product.uploader.name } </Typography>
                        <img src={paintingUrl} height={350} width={400}/>

                        <Typography gutterBottom variant="h5" component="h2">{product.title} </Typography>
                        <Typography>- { product.desc } </Typography>                        
                        <Typography> { product.price }$ </Typography>

                      </CardContent>
                      
                      {
                        ( showFavorite &&
                          user.favorites.find(i=>i._id===product._id)) &&
                          (
                            <>
                            <CardActions>
                              <Button size="small" color="primary" onClick={()=>{
                                axios.post(`${serverURL}/users/deletefavorite`, { productId: product._id, userId: user._id })
                                .then(response=>console.log(response))
                                .then(()=>{
                                  setFavorite(!showFavorite);
                                })
                                .then(()=>{
                                  setButton(!buttonToggle);
                                })
                              }} ><Typography>💖</Typography></Button>
                            </CardActions>
                            </>
                          )
                      }

                      {
                        ( !showFavorite &&
                          user.favorites.find(i=>i._id===product._id)==null) &&
                        
                          (
                            <>
                            <CardActions>
                              <Button size="small" color="primary" onClick={()=>{
                                axios.post(`${serverURL}/users/addfavorite`, { productId: product._id, userId: user._id })
                                .then(response=>console.log(response))
                                .then(()=>{
                                  setFavorite(!showFavorite);
                                })
                                .then(()=>{
                                  setButton(!buttonToggle);
                                })
                              }} ><Typography>🤍</Typography></Button>
                            </CardActions>
                            </>
                          )
                        
                      }
                      
                      
                        
                  </Card>
                  {
                    allComments && (
                      allComments.map((aComment)=>{
                        return (
                        <CardContent className={classes.cardContent} key={aComment._id}>
                          <Typography> { aComment.uploader.name } : </Typography>

                          {
                            aComment.uploader._id === user._id ? (<>
                            {
                              !modifyId.includes(aComment._id) &&
                              <>
                              <Typography> { aComment.desc } </Typography>
                              <Button size="small" color="primary" onClick={()=>{
                                const commentId = aComment._id;
                                axios.get(`${serverURL}/comments/delete/${commentId}`)
                                .then(response=>console.log(response, 'deleted successfully'))
                                .catch(err=>console.log(err))
                                setButton(!buttonToggle);

                              }}>❌Delete</Button>
                              <Button size="small" color="primary" onClick={()=>{
                                setComment2(aComment.desc);
                                setModifyId([...modifyId, aComment._id]);
                                setButton(!buttonToggle);
                              }}>❗️Modify</Button>
                              </>
                            }

                            {
                              modifyId.includes(aComment._id) &&
                              <>

                                <form onSubmit={e=>{
                                  handleModifySubmit(e, aComment._id);
                                  setModifyId(modifyId.filter(item=>item!==aComment._id));
                                  setButton(!buttonToggle);
                                  setComment2('');
                                }}>
                                  <br />
                                  <input name='comment2' type='text' value={comment2} onChange={e=>{
                                    setComment2(e.target.value);
                                  }} />
                                  <button>Modify</button>

                                </form>
                              </>
                              
                            }
                            </>
                            ):
                            <Typography> { aComment.desc } </Typography>

                          }
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
            
            </>:
            <div className={classes.circle}>
            <CircularProgress />
            </div>
            }

            {
              !token &&
            <div className={classes.heroContent}>
              <Container maxWidth="sm" >
                      <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                  Please LogIn:)
                  </Typography>
              </Container>
            </div>
            }
            
            

          
                    
                    
                    

                   
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



export default ProductDetail;