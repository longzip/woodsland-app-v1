import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ProductionsTypes } from './Actions'

export const fetchProductionsLoading = (state) => ({
  ...state,
  productionsIsLoading: true,
  productionsErrorMessage: null,
})

export const fetchProductionsSuccess = (state, { productions }) => ({
  ...state,
  productions: productions,
  productionsIsLoading: false,
  productionsErrorMessage: null,
})

export const fetchProductionsFailure = (state, { errorMessage }) => ({
  ...state,
  productions: [],
  productionsIsLoading: false,
  productionsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ProductionsTypes.FETCH_PRODUCTIONS_LOADING]: fetchProductionsLoading,
  [ProductionsTypes.FETCH_PRODUCTIONS_SUCCESS]: fetchProductionsSuccess,
  [ProductionsTypes.FETCH_PRODUCTIONS_FAILURE]: fetchProductionsFailure,
})
