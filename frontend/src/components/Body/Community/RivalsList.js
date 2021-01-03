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


const RivalsList = () => {
  const dispatch = useDispatch();
  const loadedRivals = useSelector((state) => state.session.rivals);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rivals, setRivals] = useState([]);
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

  return (
    isLoaded && (
      <>
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
        <Typography component="h1" variant="h5">
          Current rivals:{" "}
        </Typography>
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
