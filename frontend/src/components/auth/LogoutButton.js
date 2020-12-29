import React from "react";
import { logout } from "../../services/auth";
import { Button } from "@material-ui/core";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <Button variant="contained" onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
