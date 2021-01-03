import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import * as sessionActions from "../../store/actions/session.js";
import { useDispatch, useSelector } from "react-redux";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([])
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId, email }  = useParams();
  const loadedRivals = useSelector((state) => state.session.rivals);
  console.log("loaded rivals", loadedRivals)
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

  useEffect(() => {
		dispatch(sessionActions.retrieveUsers())
			.then((data) => {
				// console.log("data.users", data.users);
        // setTheUser(data)
				setUsers(data);
			})
  }, []);

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
  // console.log("User in prof", userId)
  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Name</strong> {user.firstname} {user.lastname}
      </li>
      <li>
        <strong>Email</strong> {email}
      </li>
      <Dashboard />
    </ul>
  );
}
export default User;
