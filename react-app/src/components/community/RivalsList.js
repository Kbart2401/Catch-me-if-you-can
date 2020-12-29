import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function RivalsList() {
	const [rivals, setRivals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`/api/users/${userId}/rivals`);
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	const userComponents = users.map((user) => {
		return (
			<li key={user.id}>
				<NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
			</li>
		);
	});

	return (
		<>
			<h1>User List: </h1>
			<ul>{userComponents}</ul>
		</>
	);
}

export default UsersList;