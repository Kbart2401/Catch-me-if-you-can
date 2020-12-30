import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
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
		margin: theme.spacing(3, 0, 2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SignUpForm = ({ authenticated, setAuthenticated }) => {
	const [firstname, setFirstname] = useState(""); //first name
	const [lastname, setLastname] = useState(""); //last name
	const [gender, setGender] = useState("gender"); //gender
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);

	// useEffect, set isLoaded=true, render after
	useEffect(() => {
		if (isLoaded === true) {
			console.log("hello, effect loaded");
		}
		setIsLoaded(true);
	}, [isLoaded]);

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
				<form className={classes.form} onSubmit={onSignUp}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								type="text"
								name="firstname"
								onChange={updateFirstname}
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
								onChange={updateLastname}
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
								onChange={updateEmail}
								value={email}
								label="Email"
								required={true}
								autoFocus
								variant="outlined"
							></TextField>
						</Grid>
						<Grid item xs={12} sm={6}>
							{/* <label>Gender</label> */}
							<FormControl className={classes.formControl}>
								<InputLabel id="gender-select-label">Gender</InputLabel>
								<Select
									className={classes.select}
									labelId="gender-select-label"
									defaultValue="gender"
									// value={gender}
									onChange={updateGender}
									autoFocus
									// variant="outlined"
									// className={classes.selectEmpty}
									displayEmpty={true}
									margin="normal"
								>
									{/* <MenuItem disabled>Gender</MenuItem> */}
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
							{/* <label>Password</label> */}
							<TextField
								type="password"
								name="password"
								onChange={updatePassword}
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
								onChange={updateRepeatPassword}
								value={repeatPassword}
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
