import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function RivalsList() {
	const [rivals, setRivals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`/api/users/${userId}/rivals`);
			const responseData = await response.json();
			setRivals(responseData.rivals);
		}
		fetchData();
	}, []);

	const rivalComponents = rivals.map((rival) => {
		return (
			<li key={user.id}>
				<NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
			</li>
		);
	});

	return (
		<>
			<h1>Rival List: </h1>
			<ul>{rivalComponents}</ul>
		</>
	);
}

export default RivalsList;