import {
  SET_USER, REMOVE_USER, SET_RIVALS,
  SET_ROUTES, SET_TOTAL_TIME, SET_TOTAL_DISTANCE,
  SET_RIVAL, REMOVE_RIVAL, ADD_ROUTE, DELETE_ROUTE
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

    case SET_RIVAL:
      newState = Object.assign({}, state);
      newState.rivals = [...newState.rivals, action.payload]
      return newState

    case REMOVE_RIVAL:
      newState = Object.assign({}, state);
      const newRivals = newState.rivals.filter((rival) => rival.id !== action.payload.id)
      newState.rivals = newRivals
      return newState

    case SET_ROUTES:
      newState = Object.assign({}, state);
      newState.created_routes = action.payload
      return newState;

    case ADD_ROUTE:
      newState = Object.assign({}, state);
      newState.created_routes = { ...newState.created_routes, ...action.payload };
      return newState;

    case DELETE_ROUTE:
      newState = Object.assign({}, state);
      delete newState.created_routes[action.payload];
      return newState;

    case SET_TOTAL_TIME:
      newState = Object.assign({ ...state }, { total_run_time: action.payload })
      return newState

    case SET_TOTAL_DISTANCE:
      newState = Object.assign({ ...state }, { total_distance_ran: action.payload })
      return newState
    default:
      return state;
  }
}

export default sessionReducer
