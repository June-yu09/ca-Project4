import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import axios from 'axios';






const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});




class SignIn extends Component {
    state = {
        email:'',
        password:'',
    }
    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value,
        })

    }
    handleSubmit = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', this.state)
        .then(res=>{
            console.log(res)
        })
        .then(()=>{
            //have to redirect to login page
        })
        .catch(err=>console.log(err))
    }


    render (){
        const { classes } = this.props;
        
        return (
        <Container component='main' maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">Sign in</Typography>

                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate autoComplete="off">
                    <TextField onChange={this.handleChange} variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
                    <TextField onChange={this.handleChange} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                    <Grid container>
                        
                        <Grid item>
                            You don't have an account? <NavLink exact to='/register'>Register</NavLink>
                        </Grid>
                    </Grid>
                    </form>
            </div>
        </Container>
    )
    }
}

export default withStyles(useStyles)(SignIn);