import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import * as sessionActions from "../../store/actions/session.js";
import { useDispatch, useSelector } from "react-redux";
import { lastDayOfDecade } from "date-fns";

const User = (props) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const [users, setUsers] = useState([]);
	// Notice we use useParams here instead of getting the params
	// From props.
	const { userId } = useParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [rival, setRival] = useState({});
	const loadedRivals = useSelector((state) => state.session.rivals);
	console.log("loaded rivals", loadedRivals);

	// useEffect(() => {
	//     console.log("in async useEffect", userId)
	//    fetch(`/api/users/${userId}`)
	// 			.then((response) => {
	// 				response.json();
	// 			})
	// 			.then((responseJSON) => console.log("RESPONSE", responseJSON))
	//     console.log("response user in async", user)
	//     console.log("User",user)
	//     setUser(user);
	// }, [userId]);

	// useEffect(() => {
	//   const theRival = loadedRivals.filter(rival => {
	//     return (rival.id == userId)
	//   })
	//   console.log(theRival)
	//   setRival(theRival)
	// }, [])
    async function setTheRival() {
      const theRival = loadedRivals.filter(rival => {
        return (rival.id == userId)
      })
      console.log("The rival is ",theRival)
      setRival(theRival)
    }

	useEffect(() => {
		dispatch(sessionActions.retrieveUsers())
			.then((data) => {
				console.log(data.users);
				const result = data.users.filter((user) => checkSearch(user));
				setRival(result);
				console.log("The rival is ", rival);
			})
			.then(setIsLoaded(true));
	}, []);
	const checkSearch = (rival) => {
		console.log(rival.id.toString(), userId);
		console.log(rival.id.toString() == userId);
		return rival.id.toString() == userId;
	};

	// const setTheUser = (users) => {
	//   console.log("Users in setTheUser",users)
	//         const results = users.filter((user) => checkUser(user));
	//         setUsers(results);
	// }

	// const checkUser = (user) => {
	//   if (userId = user.id) {
	//      return true
	//    }
	// }
	// setTheUser()
	if (!user) {
		return null;
	}
	console.log("props", props);
	return (
		isLoaded && (
			<ul>
				<li>
					<strong>User Id</strong> {userId}
				</li>
				<li>
					<strong>Name</strong> {rival.first_name} {rival.last_name}
				</li>
				<li>
					<strong>Email</strong>
				</li>
				<Dashboard />
			</ul>
		)
	);
}
export default User;
