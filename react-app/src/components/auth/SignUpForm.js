import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
	const [firstname, setFirstname] = useState(""); //first name
	const [lastname, setLastname] = useState(""); //last name
	const [gender, setGender] = useState(""); //gender
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

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
		<form onSubmit={onSignUp}>
			<div>
				<label>First Name</label>
				<input
					type="text"
					name="firstname"
					onChange={updateFirstname}
					value={firstname}
				></input>
			</div>
			<div>
				<label>Last Name</label>
				<input
					type="text"
					name="lastname"
					onChange={updateLastname}
					value={lastname}
				></input>
			</div>
			<div>
				<label>Email</label>
				<input
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}
				></input>
			</div>
			<div>
				<label>Gender</label>
				<select>
					<option name="gender" onChange={updateGender} value="male">Male</option>
					<option name="gender" onChange={updateGender} value="female">Female</option>
				</select>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignUpForm;
