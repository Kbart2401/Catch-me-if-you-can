import { SET_USER, REMOVE_USER } from '../actions/session';

const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = { ...action.payload };
      return newState;
    case REMOVE_USER:
      console.log('Removing User')
      newState = Object.assign({}, state);
      newState.user = {};
      return newState;
    default:
      return state;
  }
}

export default sessionReducer
