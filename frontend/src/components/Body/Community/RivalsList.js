import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../../store/actions/session.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import SearchBar from "material-ui-search-bar";
import { flexbox } from "@material-ui/system";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
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
		minWidth: "auto",
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
	console.log("Loaded Rivals", loadedRivals);

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

	function addRivalButton(rival) {
		dispatch(sessionActions.addRival(user, rival));
	}

	function removeRival(rival) {
		dispatch(sessionActions.deleteRival(user, rival));
	}

	const handleClick = (userId) => {
		history.push(`/users/${userId}`);
	};

	return (
		isLoaded && (
			<Box>
				<Box mb={6}>
					<Typography variant={"h5"} className="header-font">
						Your Community
					</Typography>
					<Typography>
						The Community page is where you can view your current "rivals" and
						add new ones
					</Typography>
				</Box>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<SearchBar
							placeholder="Enter rival's first or last name here"
							value={query}
							onChange={(term) => setQuery(term)}
						/>
					</Table>
				</TableContainer>

				<Box
					display="flex"
					flexDirection="row"
					px={6}
					pt={4}
					justifyContent="space-between"
				>
					<Box  mr={6}>
						{/* {query && ( */}
						<TableContainer component={Paper} >
							<Table
								className={classes.table}
								aria-label="simple table"
								minWidth="200px"
								// justifyContent="flex-end"
							>
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography component="h2" variant="h5">
												Search Results{" "}
											</Typography>
										</TableCell>
										<TableCell align="right"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{users.map((user) => (
										// <ListItem key={user.id}>
										<TableRow selected="true">
											<TableCell>
												<Button
													onClick={() => {
														handleClick(user.id);
													}}
												>
													{user.first_name}
												</Button>
											</TableCell>
											<TableCell>
												<Typography>
													<Button align="right">
														<AddIcon onClick={() => addRivalButton(user)} />
													</Button>
												</Typography>
											</TableCell>
										</TableRow>
										// </ListItem>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						{/* )} */}
					</Box>
					<Box>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography component="h2" variant="h5">
												Current rivals{" "}
											</Typography>
										</TableCell>
										<TableCell align="right"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{loadedRivals &&
										loadedRivals.map((rival) => (
											<>
												<TableRow key={rival.id} dense button>
													<TableCell>
														<Button
															onClick={() => {
																handleClick(rival.id);
															}}
														>
															{rival.first_name}
														</Button>
													</TableCell>
													<TableCell>
														<Button align="right">
															<ClearIcon
																onClick={() => {
																	removeRival(rival);
																}}
															/>
														</Button>
													</TableCell>
												</TableRow>
											</>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
				{/* </TableContainer> */}
			</Box>
		)
	);
};

export default RivalsList;
