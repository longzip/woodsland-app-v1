/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WorkordersTypes } from './Actions'

export const fetchWorkordersLoading = (state) => ({
  ...state,
  workordersIsLoading: true,
  workordersErrorMessage: null,
})

export const fetchWorkordersSuccess = (state, { workorders }) => ({
  ...state,
  workorders: workorders,
  workordersIsLoading: false,
  workordersErrorMessage: null,
})

export const fetchWorkordersFailure = (state, { errorMessage }) => ({
  ...state,
  workorders: [],
  workordersIsLoading: false,
  workordersErrorMessage: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [WorkordersTypes.FETCH_WORKORDERS_LOADING]: fetchWorkordersLoading,
  [WorkordersTypes.FETCH_WORKORDERS_SUCCESS]: fetchWorkordersSuccess,
  [WorkordersTypes.FETCH_WORKORDERS_FAILURE]: fetchWorkordersFailure,
})
