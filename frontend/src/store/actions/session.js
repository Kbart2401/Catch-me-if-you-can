//Store Action Types
export const SET_USER = 'Catch_Me_If_You_Can/session/SET_USER';
export const REMOVE_USER = 'Catch_Me_If_You_Can/session/REMOVE_USER';
export const SET_RIVALS = 'Catch_Me_If_You_Can/session/SET_RIVALS';
export const SET_USERS = 'Catch_Me_If_You_Can/session/SET_USERS';
export const SET_ROUTES = 'Catch_Me_If_You_Can/session/SET_ROUTES';

//Store Actions
const setUser = (user) => ({ type: SET_USER, payload: user });
const removeUser = (user) => ({ type: REMOVE_USER });
const setRivals = (rivals) => ({ type: SET_RIVALS, payload: rivals });
const setUsers = (users) => ({ type: SET_USERS, payload: users });
const setCreatedRoutes = routes => ({ type: SET_ROUTES, payload: routes })

//Login Thunk
export const loginUser = (user) => async (dispatch) => {
  const { email, password } = user;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data));
      window.location.replace("/dashboard")
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export const signupUser = (user) => async (dispatch) => {
  const { firstname, lastname, gender, email, height, weight, password } = user;
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        gender,
        email,
        height,
        weight,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data))
      window.location.replace("/dashboard");
      return data;
    }
  } catch (e) {
    console.error(e)
  }
};

export const restoreUser = () => async dispatch => {
  try {
    const res = await fetch('/api/users/restore', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      dispatch(setRivals(data.rivals))
      dispatch(setCreatedRoutes(data.created_routes))
      return data
    }
  }
  catch (e) {
    console.error(e)
  }
};

export const retrieveRivals = (userId) => async dispatch => {
  try {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
      const data = await res.json()
      dispatch(setRivals(data.rivals))
      return data;
    }

  } catch (e) {
    console.error(e)
  }
}
export const retrieveUsers = () => async dispatch => {
  try {
    const res = await fetch(`/api/users/`);

    if (res.ok) {
      const data = await res.json()
      dispatch(setUsers(data))
      return data;
    }

  } catch (e) {
    console.error(e)
  }
}

export const logoutUser = () => async dispatch => {
  try {
    const res = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(dispatch(removeUser()))

    return res
  } catch (e) {
    console.error(e)
  }
}
