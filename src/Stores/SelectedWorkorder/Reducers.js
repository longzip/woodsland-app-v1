import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WorkorderTypes } from './Actions'

export const fetchWorkorderLoading = (state) => ({
  ...state,
  workorderIsLoading: true,
  workorderErrorMessage: null,
})

export const fetchWorkorderSuccess = (state, { workorder }) => ({
  ...state,
  workorder: workorder,
  workorderIsLoading: false,
  workorderErrorMessage: null,
})

export const fetchWorkorderFailure = (state, { errorMessage }) => ({
  ...state,
  workorder: [],
  workorderIsLoading: false,
  workorderErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [WorkorderTypes.FETCH_WORKORDER_LOADING]: fetchWorkorderLoading,
  [WorkorderTypes.FETCH_WORKORDER_SUCCESS]: fetchWorkorderSuccess,
  [WorkorderTypes.FETCH_WORKORDER_FAILURE]: fetchWorkorderFailure,
})
