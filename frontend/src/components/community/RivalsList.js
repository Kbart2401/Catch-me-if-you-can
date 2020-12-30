import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function RivalsList() {
	const [rivals, setRivals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`/api/users/1`);
			console.log("response", response);
			const responseData = await response.json();
			console.log("response data", responseData);
			setRivals(responseData.rivals);
		}
		fetchData();
	}, []);
	let rivalComponents = [];
	if (rivals) {
		rivalComponents = rivals.map((rival) => {
			return (
				<li key={rival.id}>
					<NavLink to={`/users/${rival.id}`}>{rival.first_name}</NavLink>
				</li>
			);
		});
	}

	return (
		<>
			<h1>Rival List: </h1>
			<ul>{rivalComponents}</ul>
		</>
	);
}

export default RivalsList;
