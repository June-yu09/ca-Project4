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

class SignUp extends Component {
    state = {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        city:''
    }
    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value,
        })
    }
    handleSubmit = e =>{
        e.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
            alert('Please put password correctly')
        }else{
            axios.post('http://localhost:5000/users', this.state)
            .then(response=>{
                console.log(response);
            })
            .catch(err=>console.log(err))
        }
    }


    render (){
        const { classes } = this.props;
        
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                                Sign up
                </Typography>
                    
                        <form onSubmit={this.handleSubmit} className={classes.form} noValidate autoComplete="off">
                        <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                    onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="confirmPassword"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="city"
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
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    Already have an account? <NavLink exact to='/signin'>Sign In</NavLink>
                                </Grid>
                            </Grid>


                            

                        </form>
    
            </div>

            </Container>
        )
    }
}

export default withStyles(useStyles)(SignUp);