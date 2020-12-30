import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/actions/session';

//MUI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Select } from "@material-ui/core";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = (props) => {
  //Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //Component States
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = (e) => {
    e.preventDefault();
    (password === confirmPassword)
      ? dispatch(sessionActions.signupUser({ firstname, lastname, gender, email, password }))
      : setErrors(['Please confirm your inputs are valid'])
    history.push('/home')
  };

  const handleChange = prop => e => {
    switch (prop) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'firstname':
        setFirstname(e.target.value);
        break;
      case 'lastname':
        setLastname(e.target.value);
        break;
      case 'gender':
        setGender(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
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
          Sign Up
				</Typography>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{
            <Typography>errors</Typography>
          }</li>)}
        </ul>
      </div>
      <form className={classes.form} onSubmit={onSignUp}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange('firstname')}
              value={firstname}
            ></input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              onChange={handleChange('lastname')}
              value={lastname}
            ></input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange('email')}
              value={email}
            ></input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Gender</label>
            <Select onChange={handleChange('gender')}>
              <option name="gender" value="male">
                Male
							</option>
              <option name="gender" value="female">
                Female
							</option>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange('password')}
              value={password}
            ></input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange('confirmPassword')}
              value={confirmPassword}
              required={true}
            ></input>
          </Grid>
          <Button variant="contained" type="submit">
            Sign Up
					</Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
							</Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpForm;
