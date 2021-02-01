import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/actions/session";

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
  input: {
    paddingBottom: '10px'
  }
}));

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.loginUser({ email, password }))
      .catch(res => {
        if (res.errors) return setErrors(res.errors)
      })
  };

  const handleChange = (prop) => (e) => {
    switch (prop) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
				</Typography>
        <div>
          <ul style={{ color: 'red', listStyleType: 'none' }}>
            {errors.map(error => (
              <li key={error}>
                <Typography >{error}</Typography>
              </li>
            ))}
          </ul>
        </div>
        <form className={classes.form} onSubmit={onLogin}>
          <Grid container spacing={2}>
            <TextField
            className={classes.input}
              fullWidth
              label="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleChange("email")}
              autoFocus
              variant="outlined"
            ></TextField>
            <TextField
              fullWidth
              label="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange("password")}
              autofocus
              variant="outlined"
            ></TextField>
            <Button
              variant="contained"
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
  );
};

export default LoginForm;
