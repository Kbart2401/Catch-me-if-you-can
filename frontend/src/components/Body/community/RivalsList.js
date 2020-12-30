import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function RivalsList() {
  const loadedRivals = useSelector(state => state.session.rivals)
  const user = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const [rivals, setRivals] = useState([])

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  return isLoaded && (
    <>
      <h1>Rival List: </h1>
      <ul>{rivals.map(rival => (
        <li key={rival.id}>
          <NavLink to={`/users/${rival.id}`}>{rival.username}</NavLink>
        </li>
      ))}</ul>
    </>
  );
}

export default RivalsList;
