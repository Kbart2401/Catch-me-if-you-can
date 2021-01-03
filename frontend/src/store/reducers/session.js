import {
  SET_USER, REMOVE_USER, SET_RIVALS,
  SET_ROUTES, SET_RUNS
} from '../actions/session';

const initialState = { user: null, rivals: [] };
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = { ...action.payload };
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_RIVALS:
      newState = Object.assign({}, state);
      newState.rivals = [...action.payload]
      return newState
    case SET_RUNS:
      console.log('setting runs')
      newState = Object.assign({}, state);
      newState.runs = [...action.payload]
      return newState
    case SET_ROUTES:
      newState = Object.assign({ ...state }, { created_routes: action.payload })
      return newState;
    default:
      return state;
  }
}

export default sessionReducer
