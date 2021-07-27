import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useGetUser } from '../context/userContext';
import { useProduct } from '../context/productContext';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
      },
  }))

const ProductUpdate = () => {
    let classes = useStyles();
    let { getTheUser } = useGetUser();
    let { productDetail } = useProduct();
    let { productId } = useParams();

    let [ product, setProduct ] = useState();
    let [ user, setUser ] = useState();
    let [ title, setTitle ] = useState();
    let [ desc, setDesc ] = useState();
    let [ price, setPrice ] = useState();
    let [ file, setFile ] = useState();


    // handlechange 는 onChange 사용할것
    useEffect(async ()=>{
        const theUser = await getTheUser();
        setUser(theUser);
        const theProduct = await productDetail(productId);
        setProduct(theProduct);
        setTitle(theProduct.title);
        setDesc(theProduct.desc);
        setPrice(theProduct.price);
    },[]);
        
    return (
        <>
            {
                user &&
            
            
            <Container component="main" maxWidth="xs">
            <CssBaseline />

                <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                                Product Update
                </Typography>
                    
                        <form onSubmit={
                            e =>{
                                e.preventDefault();
                                const formData = new FormData();
                                formData.append('title', title);
                                formData.append('desc', desc);
                                formData.append('price', price);
                                formData.append('uploader', user._id);
                                formData.append('productId', productId);
                                formData.append('productImage', file);

                                axios.post('http://localhost:5000/products/update', formData)
                                .then(response=>{
                                    console.log(response);
                                    console.log('user?:', user);
                                    setTitle('');
                                    setDesc('');
                                    setPrice('');
                                    alert('Uploaded successfully!');                            
                                })
                                .catch(err=>console.log(err))
                            
                            }
                        }
                        className={classes.form} noValidate autoComplete="off" encType="multipart/form-data">
                        <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                onChange={e=>{
                                    setTitle(e.target.value);
                                }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                    value={title}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                onChange={e=>{
                                    setDesc(e.target.value);
                                }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="desc"
                                    label="Desc"
                                    name="desc"
                                    value={desc}
                                />
                                </Grid>

                                <Grid item xs={12}>
                                        <TextField
                                        onChange={e=>{
                                            setPrice(e.target.value);
                                        }}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="price"
                                            label="Price"
                                            type="price"
                                            id="price"
                                            value={price}
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={e=>{
                                        setFile(e.target.files[0]);
                                    }}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                    </Button>
                                </label>
                                </Grid>
                            </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}

                                >
                                    Submit
                                </Button>

                            </form>
        
                    </div>
                

                </Container>
                }
        </>
     
    )
    }


export default ProductUpdate;