import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../../store/actions/session.js";
import { useDispatch } from "react-redux";
import SearchBar from "material-ui-search-bar";

function RivalsList() {
	const dispatch = useDispatch();
	const loadedRivals = useSelector((state) => state.session.rivals);
	const user = useSelector((state) => state.session.user);
	const [isLoaded, setIsLoaded] = useState(false);
	const [rivals, setRivals] = useState([]);
	const [users, setUsers] = useState([])
	const [query, setQuery] = useState("") //if gender is "", will pull up in search results

	useEffect(() => {
		if (user) {
			dispatch(sessionActions.retrieveRivals(user.id))
				.then((data) => setRivals(data.rivals))
				.then(setIsLoaded(true));
		}
	}, [user]);
	useEffect(() => {
		dispatch(sessionActions.retrieveUsers())
			.then((data) => {
				console.log(data.users)
				const results = data.users.filter(user => checkSearch(user))
				setUsers(results)
			})
				.then(setIsLoaded(true));
	}, [query]);
	
	const checkSearch = (term) => {
		return Object.values(term).includes(query)
	}

	console.log(users, "are the matching users")

	const onInputChange = (term) => {
		setQuery(term);
	}
	
	return (
		isLoaded && (
			<>
				<h1>Search for new rivals:</h1>
				<SearchBar
					placeholder="Enter rival's name "
					value={query}
					onChange={(term) => setQuery(term)}
				/>
				<h1>Search Results: </h1>
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							<NavLink to={`/users/${user.id}`}>{user.first_name}</NavLink>
						</li>
					))}
				</ul>
				<h1>Current rivals: </h1>
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
