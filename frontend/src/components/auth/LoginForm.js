import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const LoginForm = ({ authenticated, setAuthenticated }) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const classes = useStyles();

	const onLogin = async (e) => {
		e.preventDefault();
		const user = await login(email, password);
		if (!user.errors) {
			setAuthenticated(true);
			window.localStorage.setItem("userId", user.id);
		} else {
			setErrors(user.errors);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (authenticated) {
		return <Redirect to="/" />;
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
							onChange={updateEmail}
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
							onChange={updatePassword}
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
								<Link href="/sign-up" variant="body2">
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
