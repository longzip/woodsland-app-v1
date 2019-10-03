/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SelectedProductionTypes } from './Actions'

export const fetchProductionLoading = (state) => ({
  ...state,
  productionsIsLoading: true,
  productionsErrorMessage: null,
})

export const fetchProductionSuccess = (state, { production }) => ({
  ...state,
  production: production,
  productionIsLoading: false,
  productionErrorMessage: null,
})

export const fetchProductionFailure = (state, { errorMessage }) => ({
  ...state,
  production: {},
  productionIsLoading: false,
  productionErrorMessage: errorMessage,
})

export const saveProductionSuccess = (state, { production }) => ({
  ...state,
  production: production,
  productionIsLoading: false,
  productionErrorMessage: null,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [SelectedProductionTypes.FETCH_PRODUCTION_LOADING]: fetchProductionLoading,
  [SelectedProductionTypes.FETCH_PRODUCTION_SUCCESS]: fetchProductionSuccess,
  [SelectedProductionTypes.FETCH_PRODUCTION_FAILURE]: fetchProductionFailure,
  [SelectedProductionTypes.SAVE_PRODUCTION_SUCCESS]: saveProductionSuccess,
})
