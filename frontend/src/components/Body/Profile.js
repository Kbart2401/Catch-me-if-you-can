import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import * as sessionActions from "../../store/actions/session.js";
import { useDispatch } from "react-redux";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([])
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
		dispatch(sessionActions.retrieveUsers())
			.then((data) => {
				console.log("data.users", data.users);
				// console.log("Results for SetUsers", results)
				setUsers(data);
			})
  }, []);
  
  if (!user) {
    return null;
  }
  console.log("user ", userId)
  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Name</strong> {user.first_name} {user.last_name}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <Dashboard />
    </ul>
  );
}
export default User;
