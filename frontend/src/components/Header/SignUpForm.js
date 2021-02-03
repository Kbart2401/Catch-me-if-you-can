import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/actions/session';

//MUI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
  select: {
    width: "100%",
    // height: 56,
    marginTop: theme.spacing(-1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    backgroundImage: 'linear-gradient(#3f51b5, #3f86b5)',
    color: 'white',
    marginBottom: '20px',
    '&:hover': {
      bottom: '3px',
      backgroundImage: 'linear-gradient(#3f86b5, #3f51b5)'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const onSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(sessionActions.signupUser({ firstname, lastname, gender, email, height, weight, password }))
      history.push('/dashboard')
    } else {
      setErrors(['Please confirm your inputs are valid'])
    }
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
      case 'height':
        setHeight(e.target.value);
        break;
      case 'weight':
        setWeight(e.target.value);
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

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
				</Typography>
        <form className={classes.form} onSubmit={onSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="firstname"
                onChange={handleChange('firstname')}
                value={firstname}
                label="First Name"
                required={true}
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="lastname"
                onChange={handleChange('lastname')}
                value={lastname}
                label="Last Name"
                required={true}
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="email"
                onChange={handleChange('email')}
                value={email}
                label="Email"
                required={true}
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  className={classes.select}
                  labelId="gender-select-label"
                  defaultValue="gender"
                  onChange={handleChange('gender')}
                  autoFocus
                  displayEmpty={true}
                  margin="normal"
                >
                  <MenuItem name="gender" value="male">
                    Male
									</MenuItem>
                  <MenuItem name="gender" value="female">
                    Female
									</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="height"
                onChange={handleChange('height')}
                value={height}
                label="Height(cm)"
                required={true}
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="weight"
                onChange={handleChange('weight')}
                value={weight}
                label="Weight"
                required={true}
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                name="password"
                onChange={handleChange('password')}
                value={password}
                label="password"
                required={true}
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                name="repeat_password"
                onChange={handleChange('confirmPassword')}
                value={confirmPassword}
                required={true}
                label="Repeat password"
                autoFocus
                variant="outlined"
              ></TextField>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              className={classes.submit}
            >
              Sign Up
						</Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
								</Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
