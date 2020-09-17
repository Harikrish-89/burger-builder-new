import * as ActionTypes from "../actions/actionsTypes";
import { setAuthRedirectPath } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  authRedirectPath: "/"
};
const authStart = (action, state) => {
  return {
    ...state,
    isLoading: true
  };
};

const authSuccess = (action, state) => {
  return {
    ...state,
    token: action.payLoad.token,
    userId: action.payLoad.userId,
    error: null,
    isLoading: false
  };
};

const authFailure = (action, state) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: action.payLoad.error,
    isLoading: false
  };
};

const authLogout =(action, state) =>{
  return {
    ...state,
    token: null,
    userId: null,
    error: null,
    isLoading: false
  }
}
const authRedirectPath = (action, state) => {
  return{
    ...state,
    authRedirectPath: action.payLoad.path
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_STARTED:
      return authStart(action, state);
    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(action, state);
    case ActionTypes.AUTH_FAILURE:
      return authFailure(action, state);
    case ActionTypes.AUTH_LOGOUT:
      return authLogout(action, state);
    case ActionTypes.SET_AUTH_REDIRECT_PATH:
      return authRedirectPath(action,state);
    default:
      return state;
  }
};

export default reducer;
