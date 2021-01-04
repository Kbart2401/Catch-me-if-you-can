import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../../store/actions/session.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import SearchBar from "material-ui-search-bar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	table: {
		minWidth: 650,
	},
}));

const RivalsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
	const loadedRivals = useSelector((state) => state.session.rivals);
	const user = useSelector((state) => state.session.user);
	const [isLoaded, setIsLoaded] = useState(false);
	const [rivals, setRivals] = useState([]);
	const [users, setUsers] = useState([]);
	const [query, setQuery] = useState("");
	const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  

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
				const results = data.users.filter((user) => checkSearch(user));
				setUsers(results);
			})
			.then(setIsLoaded(true));
	}, [query]);

	const checkSearch = (searchObj) => {
		if (query !== "") {
			return Object.values(searchObj).includes(query);
		}
	};

	 function addRival(rival) {
					fetch("/api/rivals/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
              id: user.id,
              rival_id: rival.id
						}),
          });
          // setRivals([...rivals, rival])
				}
	 function removeRival(rivalId) {
					fetch("/api/rivals/", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
              id: user.id,
              rival_id: rivalId
						}),
					});
  			}

  const handleClick = (userId) => {
    history.push(`/users/${userId}`);
  }

  // const clickSearch = (user) => {
  //     setRivals(user)
  // }
  
	return (
		isLoaded && (
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<Typography component="h1" variant="h5">
						Search for new rivals:
					</Typography>
					<SearchBar
						placeholder="Enter rival's name "
						value={query}
						onChange={(term) => setQuery(term)}
					/>
					<Typography component="h1" variant="h5">
						Search Results:{" "}
					</Typography>
					<TableBody>
						{users.map((user) => (
							<ListItem key={user.id}>
								<Typography>
									<Button
										onClick={() => {
                      handleClick(user.id);
                      // clickSearch(user)
										}}
									>
										{user.first_name}
									</Button>
									<Button align="right">
										<AddIcon
											onClick={
												addRival(user)
											}
										/>
									</Button>
								</Typography>
							</ListItem>
						))}
					</TableBody>
					<Typography component="h1" variant="h5">
						Current rivals:{" "}
					</Typography>
					<TableBody>
						{loadedRivals.map((rival) => (
							<>
								<TableRow key={rival.id} dense button>
									<Typography>
										<Button
											onClick={() => {
												handleClick(rival.id);
											}}
										>
											{rival.first_name}
										</Button>
										<Button align="right">
											<ClearIcon
												onClick={() => {
													removeRival(rival.id);
												}}
											/>
										</Button>
									</Typography>
								</TableRow>
							</>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	);
};

export default RivalsList;
