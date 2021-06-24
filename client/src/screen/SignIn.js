import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, Redirect } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
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
}));




function SignIn () {

    const classes = useStyles();


    return (
        
        <Container component='main' maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">Sign in</Typography>

                    <form onSubmit={()=>{}} className={classes.form} noValidate autoComplete="off">
                    <TextField onChange={()=>{}} variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
                    <TextField onChange={()=>{}} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
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


export default SignIn;