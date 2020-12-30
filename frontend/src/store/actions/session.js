//Store Action Types
export const SET_USER = 'Catch_Me_If_You_Can/session/SET_USER';
export const REMOVE_USER = 'Catch_Me_If_You_Can/session/REMOVE_USER';
export const SET_RIVALS = 'Catch_Me_If_You_Can/session/SET_RIVALS';

//Store Actions
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const removeUser = (user) => ({ type: REMOVE_USER });
export const setRivals = (rivals) => ({ type: SET_RIVALS, payload: rivals });

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

      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export const signupUser = (user) => async (dispatch) => {
  const { firstname, lastname, gender, email, password } = user;
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
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data))
    }
  } catch (e) {
    console.error(e)
  }
};

export const restoreUser = () => async dispatch => {
  try {
    const res = await fetch('/api/auth/', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data))
      return data
    }
  }
  catch (e) {
    console.error(e)
  }
};

export const retrieveRivals = (userId) => async dispatch => {
  try {
    const res = await fetch(`/api/users/${userId}/rivals`);

    if (res.ok) {
      const data = await res.json()
      dispatch(setRivals(data))
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
