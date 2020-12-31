import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../../store/actions/session.js";
import { useDispatch } from "react-redux";
import SearchBar from "material-ui-search-bar";

// MUI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

function RivalsList() {
	const dispatch = useDispatch();
	const loadedRivals = useSelector((state) => state.session.rivals);
	const user = useSelector((state) => state.session.user);
	const [isLoaded, setIsLoaded] = useState(false);
	// const [rivals, setRivals] = useState([]);
	const [users, setUsers] = useState([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (user) {
			dispatch(sessionActions.retrieveRivals(user.id))
				// .then((data) => setRivals(data.rivals))
				.then(setIsLoaded(true));
		}
	}, [user]);
	useEffect(() => {
		dispatch(sessionActions.retrieveUsers())
			.then((data) => {
				console.log(data.users);
				const results = data.users.filter((user) => checkSearch(user));
				setUsers(results);
			})
			.then(setIsLoaded(true));
	}, [query]);

	const checkSearch = (searchObj) => {
		if (query !== "") {
			return (
				Object.values(searchObj).includes(query.toLowerCase()) ||
				Object.values(searchObj).includes(query.toUpperCase())
			);
		}
	};

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
				<List>
					{users.map((user) => (
						<ListItem key={user.id}>
							<NavLink to={`/users/${user.id}`}>{user.first_name}</NavLink>
						</ListItem>
					))}
				</List>
				<h1>Current rivals: </h1>
				<List>
					{loadedRivals.map((rival) => (
						<ListItem key={rival.id}>
							<NavLink to={`/users/${rival.id}`}>{rival.first_name}</NavLink>
						</ListItem>
					))}
				</List>
			</>
		)
	);
}

export default RivalsList;
