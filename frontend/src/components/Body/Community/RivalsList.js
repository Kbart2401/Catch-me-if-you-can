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
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

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
        // console.log("Results for SetUsers", results)
        setUsers(results);
      })
      .then(setIsLoaded(true));
  }, [query]);

  const checkSearch = (searchObj) => {
    // console.log("In checkSearch", searchObj)
    // console.log("query ", query)
    // console.log("Object values", Object.values(searchObj))
    // console.log("Object values", Object.values(searchObj).includes(query))
    if (query !== "") {
      return (
        Object.values(searchObj).includes(query)
      );
    }
  };

//  function addRival() {
// 				fetch("/api/rivals/", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({
// 						id: user.id,
// 					}),
// 				});
// 			}
//  function removeRival() {
// 				fetch("/api/rivals/", {
// 					method: "DELETE",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({
// 						id: user.id,
// 					}),
// 				});
// 			}
  
  return (
		isLoaded && (
			<Container>
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
				<List>
					{users.map((user) => (
						<ListItem key={user.id}>
							<NavLink to={`/users/${user.id}`}>{user.first_name}</NavLink>
						</ListItem>
					))}
				</List>
				<div>
					<Typography component="h1" variant="h5">
						Current rivals:{" "}
					</Typography>
					<List>
						{loadedRivals.map((rival) => (
							<ListItem>
								<ListItem key={rival.id} dense button>
									<NavLink rival={rival} to={`/users/${rival.id}`}>
										{rival.first_name}
									</NavLink>
								</ListItem>
								<IconButton edge="end">
									{/* <ClearIcon onClick={addRival()} /> */}
									<ClearIcon />
								</IconButton>
							</ListItem>
						))}
					</List>
				</div>
			</Container>
		)
	);
}

export default RivalsList;
