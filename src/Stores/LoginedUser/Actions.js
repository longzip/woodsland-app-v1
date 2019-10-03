import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  login: ["username", "password"],
  loginLoading: null,
  loginSuccess: ["user"],
  loginFailure: ["errorMessage"]
});

export const LoginedUserTypes = Types;
export default Creators;
