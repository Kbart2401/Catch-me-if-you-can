import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/actions/session';

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",

    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles()

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.loginUser({ email, password })).then(history.push('/dashboard')).catch(
      res => {
        if (res.data && res.data.errors) setErrors(res.data.errors)
      }
    )
  };

  const handleChange = prop => e => {
    switch (prop) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
				</Typography>
        <form className={classes.form} onSubmit={onLogin}>
          <Grid container spacing={2}>
            <TextField
              fullWidth
              label="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleChange('email')}
              autoFocus
              // margin="normal"
              variant="outlined"
            ></TextField>
            <TextField
              fullWidth
              label="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange('password')}
              autofocus
              variant="outlined"
            ></TextField>
            <Button
              variant="contianed"
              type="submit"
              fullWidth
              className={classes.submit}
            >
              Login
						</Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Ready to line up? Sign up here
								</Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm;
