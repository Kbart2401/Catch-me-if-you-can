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

  async function setTheRival() {
    const theRival = loadedRivals.filter(rival => {
      return (rival.id == userId)
    })
    setRival(theRival)
  }

  useEffect(() => {
    dispatch(sessionActions.retrieveUsers())
      .then((data) => {
        const result = data.users.filter((user) => checkSearch(user));
        setRival(result);
      })
      .then(setIsLoaded(true));
  }, []);
  const checkSearch = (rival) => {
    return rival.id.toString() == userId;
  };

  if (!user) {
    return null;
  }

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
