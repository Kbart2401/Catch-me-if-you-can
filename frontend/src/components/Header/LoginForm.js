import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/actions/session';

import { AuthContext } from '../../context/Context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const LoginForm = (props) => {
  const { setAuthDialog } = useContext(AuthContext)
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('demo@demo.demo');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.loginUser({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
    setAuthDialog(false);
  };

  const handleSignup = () => {
    props.setWhichDialog('signup')
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Log In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To Log In to this website, please enter your email address here.
          </DialogContentText>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type='text'
            value={credential}
            onChange={setCredential}
            required
            fullWidth
            color={'red'}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
            fullWidth
          />
          <Button type='submit' color="primary">
            Login
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAuthDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignup} color="primary">
          Signup?
        </Button>
      </DialogActions>
    </>
  );
}

export default LoginForm
