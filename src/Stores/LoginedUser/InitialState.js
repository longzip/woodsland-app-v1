export const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  userIsLoading: false,
  userErrorMessage: null
};
