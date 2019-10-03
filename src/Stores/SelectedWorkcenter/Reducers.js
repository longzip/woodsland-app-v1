import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { SelectedWorkcenterTypes } from "./Actions";

export const fetchWorkcenterLoading = state => ({
  ...state,
  workcenterIsLoading: true,
  workcenterErrorMessage: null
});

export const fetchWorkcenterSuccess = (state, { workcenter }) => ({
  ...state,
  workcenter: workcenter,
  workcenterIsLoading: false,
  workcenterErrorMessage: null
});

export const fetchWorkcenterFailure = (state, { errorMessage }) => ({
  ...state,
  workcenter: {},
  workcenterIsLoading: false,
  workcenterErrorMessage: errorMessage
});

export const reducer = createReducer(INITIAL_STATE, {
  [SelectedWorkcenterTypes.FETCH_WORKCENTER_LOADING]: fetchWorkcenterLoading,
  [SelectedWorkcenterTypes.FETCH_WORKCENTER_SUCCESS]: fetchWorkcenterSuccess,
  [SelectedWorkcenterTypes.FETCH_WORKCENTER_FAILURE]: fetchWorkcenterFailure
});
