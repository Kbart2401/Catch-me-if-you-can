import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "/home/nick/app_academy/Week_20_group_project2/CatchMeIfYouCan/frontend/src/store/actions/session.js";
import { useDispatch } from "react-redux";

function RivalsList() {
	const dispatch = useDispatch();
	const loadedRivals = useSelector((state) => state.session.rivals);
	const loadedUser = useSelector((state) => state.session.user);
	const [isLoaded, setIsLoaded] = useState(false);
	const [rivals, setRivals] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(loadedUser)(dispatch(sessionActions.retrieveRivals(user.id)))
			.then((data) => setRivals(data))
			.then(setIsLoaded(true));
	}, []);

	return (
		isLoaded && (
			<>
				<h1>Rival List: </h1>
				<ul>
					{rivals.map((rival) => (
						<li key={rival.id}>
							<NavLink to={`/users/${rival.id}`}>{rival.first_name}</NavLink>
						</li>
					))}
				</ul>
			</>
		)
	);
}

export default RivalsList;
