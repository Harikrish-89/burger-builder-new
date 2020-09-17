import * as ActionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: ActionTypes.AUTH_STARTED
  };
};

export const authSuccess = authData => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    payLoad: { userId: authData.email, token: authData.idToken }
  };
};

export const authFailure = error => {
  return {
    type: ActionTypes.AUTH_FAILURE,
    payLoad: { error: error }
  };
};

export const authSignUpAsync = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsZn55zh_OhacF3e6ypMfR-WATObLi-F0",
        { email: email, password: password, returnSecureToken: true }
      )
      .then(response => {
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        dispatch(authFailure(error));
      });
  };
};

export const authSignInAsync = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsZn55zh_OhacF3e6ypMfR-WATObLi-F0",
        { email: email, password: password, returnSecureToken: true }
      )
      .then(response => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem(
          "expiresAt",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailure(error));
      });
  };
};

export const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expiresIn * 1000);
  };
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: ActionTypes.AUTH_LOGOUT
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: ActionTypes.SET_AUTH_REDIRECT_PATH,
    payLoad: { path: path }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expiresAt = new Date(localStorage.getItem("expiresAt"));
      if (expiresAt <= new Date()) {
        dispatch(logOut());
      } else {
        dispatch(
          authSuccess({
            email: localStorage.getItem("userId"),
            idToken: localStorage.getItem("token")
          })
        );
        dispatch(
          checkAuthTimeout((expiresAt.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
