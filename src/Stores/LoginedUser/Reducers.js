import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { LoginedUserTypes } from "./Actions";

export const loginLoading = state => ({
  ...state,
  userIsLoading: true,
  userErrorMessage: null
});

export const loginSuccess = (state, { user }) => ({
  ...state,
  user: user,
  userIsLoading: false,
  userErrorMessage: null
});

export const loginFailure = (state, { errorMessage }) => ({
  ...state,
  user: {},
  userIsLoading: false,
  userErrorMessage: errorMessage
});

export const reducer = createReducer(INITIAL_STATE, {
  [LoginedUserTypes.LOGIN_LOADING]: loginLoading,
  [LoginedUserTypes.LOGIN_SUCCESS]: loginSuccess,
  [LoginedUserTypes.LOGIN_FAILURE]: loginFailure
});
