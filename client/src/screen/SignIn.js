import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { TokenUpdateContext } from '../context/tokenContext';
import { UserUpdateContext } from '../context/userContext';
import serverURL from '../../config';



const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  form: {
    width: '100%',
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


    render (){
        const { classes } = this.props;
        
        return (
        <TokenUpdateContext.Consumer>
            {
                tokenUpdate=>(

                    <UserUpdateContext.Consumer>
                        {
                            userUpdate =>(
                            <Container component='main' maxWidth="xs">
                                <CssBaseline />
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h5">Sign in</Typography>

                                        <form onSubmit={(e)=>{
                                            
                                            e.preventDefault();
                                            axios.post(`${serverURL}/users/login`, this.state)
                                            .then(res=>{
                                                tokenUpdate(res.data.token);
                                                userUpdate(res.data.token);
                                            })
                                            .then(()=>{
                                                this.props.history.push('/');
                                            })
                                            .catch(err=>console.log(err))
                                            
                                        }} className={classes.form} noValidate autoComplete="off">
                                        <TextField onChange={this.handleChange} variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
                                        <TextField onChange={this.handleChange} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                                        
                                        </form>
                                </div>
                            </Container>
                            )
                        }
                    
                    </UserUpdateContext.Consumer>
                )
            }
        
        </TokenUpdateContext.Consumer>
    )
    }
}

export default withStyles(useStyles)(SignIn);