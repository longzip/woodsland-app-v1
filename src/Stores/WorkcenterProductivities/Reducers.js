import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WorkcenterProductivitiesTypes } from './Actions'

export const saveWorkcenterProductivitySuccess = (state, { successMessage }) => ({
  ...state,
  workcenterProductivitiesSuccessMessage: successMessage,
  workcenterProductivitiesIsLoading: false,
  workcenterProductivitiesErrorMessage: null,
})

export const saveWorkcenterProductivityFailure = (state, { errorMessage }) => ({
  ...state,
  workcenerProductivitiesSuccessMessage: null,
  workcenterProductivitiesIsLoading: false,
  workcenterProductivitiesErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [WorkcenterProductivitiesTypes.SAVE_WORKCENTER_PRODUCTIVITY_SUCCESS]: saveWorkcenterProductivitySuccess,
  [WorkcenterProductivitiesTypes.SAVE_WORKCENTER_PRODUCTIVITY_FAILURE]: saveWorkcenterProductivityFailure,
})
