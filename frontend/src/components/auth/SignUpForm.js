import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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

const SignUpForm = ({ authenticated, setAuthenticated }) => {
	const [firstname, setFirstname] = useState(""); //first name
	const [lastname, setLastname] = useState(""); //last name
	const [gender, setGender] = useState(""); //gender
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const classes = useStyles();
	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const user = await signUp(firstname, lastname, gender, email, password);
			if (!user.errors) {
				setAuthenticated(true);
			}
		}
	};

	const updateFirstname = (e) => {
		setFirstname(e.target.value);
	};
	const updateLastname = (e) => {
		setLastname(e.target.value);
	};
	const updateGender = (e) => {
		setGender(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
			</div>
			<form className={classes.form} onSubmit={onSignUp}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<label>First Name</label>
						<input
							type="text"
							name="firstname"
							onChange={updateFirstname}
							value={firstname}
						></input>
					</Grid>
					<Grid item xs={12} sm={6}>
						<label>Last Name</label>
						<input
							type="text"
							name="lastname"
							onChange={updateLastname}
							value={lastname}
						></input>
					</Grid>
					<Grid item xs={12} sm={6}>
						<label>Email</label>
						<input
							type="text"
							name="email"
							onChange={updateEmail}
							value={email}
						></input>
					</Grid>
					<Grid item xs={12} sm={6}>
						<label>Gender</label>
						<Select onChange={updateGender}>
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
							onChange={updatePassword}
							value={password}
						></input>
					</Grid>
					<Grid item xs={12} sm={6}>
						<label>Repeat Password</label>
						<input
							type="password"
							name="repeat_password"
							onChange={updateRepeatPassword}
							value={repeatPassword}
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
