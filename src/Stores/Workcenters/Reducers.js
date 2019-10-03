import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WorkcentersTypes } from './Actions'

export const fetchWorkcentersLoading = (state) => ({
  ...state,
  workcentersIsLoading: true,
  workcentersErrorMessage: null,
})

export const fetchWorkcentersSuccess = (state, { workcenters }) => ({
  ...state,
  workcenters: workcenters,
  workcentersIsLoading: false,
  workcentersErrorMessage: null,
})

export const fetchWorkcentersFailure = (state, { errorMessage }) => ({
  ...state,
  workcenters: [],
  workcentersIsLoading: false,
  workcentersErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [WorkcentersTypes.FETCH_WORKCENTERS_LOADING]: fetchWorkcentersLoading,
  [WorkcentersTypes.FETCH_WORKCENTERS_SUCCESS]: fetchWorkcentersSuccess,
  [WorkcentersTypes.FETCH_WORKCENTERS_FAILURE]: fetchWorkcentersFailure,
})
