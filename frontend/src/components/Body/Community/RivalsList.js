import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as sessionActions from "../../../store/actions/session.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import SearchBar from "material-ui-search-bar";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//custom components
import RivalModal from "./RivalModal";
import UserModal from "./UserModal.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: "auto",
  },
  tableCell: {
    width: "143px",
    overflow: "visible",
  },
}));

const RivalsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loadedRivals = useSelector((state) => state.session.rivals);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const classes = useStyles();
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
      // return Object.values(searchObj).includes(query);
      return Object.values(searchObj).find(
        (value) => value.toString().toLowerCase() === query.toLowerCase()
      );
    }
  };

  function addRivalButton(rival) {
    let rivalCheck = loadedRivals.find((lRival) => lRival.id === rival.id);
    // let rivalCheck = loadedRivals.find((lRival) => lRival.id === rival.id || user.id === rival.id);
    let userCheck = loadedRivals.find((lRival) => user.id === rival.id);
    if (userCheck) {
      setUserModal(true)
    }
    else if (!rivalCheck) {
      dispatch(sessionActions.addRival(user, rival));
    } else {
      setModal(true)
    }
  }

  function removeRival(rival) {
    dispatch(sessionActions.deleteRival(user, rival));
  }

  const handleClick = (userId) => {
    history.push(`/dashboard/${userId}`);
  };

  const openModal = () => {
    setModal(true);
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

        <Box display="flex" flexDirection="row" px={6} pt={4}>
          <Box mr={6} width="271.8px">
            {/* {query && ( */}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        className={classes.tableCell}
                        noWrap={true}
                        component="h2"
                        variant="h5"
                      >
                        Search Results
											</Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <>
                      <TableRow key={user.id}>
                        <TableCell>
                          <Button
                            onClick={() => {
                              handleClick(user.id);
                            }}
                          >
                            {user.first_name} {user.last_name.slice(0, 1)}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button align="right">
                            <AddIcon onClick={() => addRivalButton(user)} />
                          </Button>
                          <RivalModal modal={modal} setModal={setModal} />
                          <UserModal
                            modal={userModal}
                            setModal={setUserModal}
                          />
                        </TableCell>
                      </TableRow>
                    </>
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
                              width="50px"
                              onClick={() => {
                                handleClick(rival.id);
                              }}
                            >
                              {rival.first_name} {rival.last_name.slice(0, 1)}
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
      </Box>
    )
  );
};

export default RivalsList;
