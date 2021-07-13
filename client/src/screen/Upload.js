import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.js';
import { ProductContext } from '../context/productContext.js'




const useStyles = (theme) => ({
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
  })

class Upload extends Component {

    state = {
        title:'',
        desc:'',
        price:'',
        uploader: '',
    }
    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value,
        })
    }
    

    render (){
        const { classes } = this.props;
        
        return (
            <UserContext.Consumer>
                {
                    user => (
                        <ProductContext.Consumer>
                            {
                                (products, userProduct, setUpdated) =>
                        
                        {
                            return(
                            <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            {
                                user && 
                                <div className={classes.paper}>

                                <Typography component="h1" variant="h5">
                                                Upload
                                </Typography>
                                    
                                        <form onSubmit={
                                            e =>{
                                                e.preventDefault();
                                                axios.post('http://localhost:5000/products', {...this.state, uploader: user._id})
                                                .then(response=>{
                                                    console.log(response);
                                                    console.log('user?:', user);
                                                    console.log(products, 'products...');
                                                    console.log(userProduct, 'userProducts...');
                                                    setUpdated(true);
                                                    console.log(products, 'products...');
                                                    console.log(userProduct, 'userProducts...');

                                                })
                                                .catch(err=>console.log(err))
                                            
                                            }
                                        } className={classes.form} noValidate autoComplete="off">
                                        <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                <TextField
                                                onChange={this.handleChange}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="title"
                                                    label="Title"
                                                    name="title"
                                                    autoComplete="title"
                                                />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField
                                                onChange={this.handleChange}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    id="desc"
                                                    label="Desc"
                                                    name="desc"
                                                    autoComplete="desc"
                                                />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                    onChange={this.handleChange}
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="price"
                                                        label="Price"
                                                        type="price"
                                                        id="price"
                                                    />
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
                            }

                            </Container>)
                            }
                        }
                    </ProductContext.Consumer>
                    )
                }
            
            </UserContext.Consumer>
        )
    }
}

export default withStyles(useStyles)(Upload);