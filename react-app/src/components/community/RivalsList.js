import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function RivalsList() {
    const [rivals, setRivals] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users/");
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);
    
}