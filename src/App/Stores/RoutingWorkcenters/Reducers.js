import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { RoutingWorkcentersTypes } from './Actions'

export const fetchRoutingWorkcentersLoading = (state) => ({
  ...state,
  routingWorkcentersIsLoading: true,
  routingWorkcentersErrorMessage: null,
})

export const fetchRoutingWorkcentersSuccess = (state, { routingWorkcenters }) => ({
  ...state,
  routingWorkcenters: routingWorkcenters,
  routingWorkcentersIsLoading: false,
  routingWorkcentersErrorMessage: null,
})

export const fetchRoutingWorkcentersFailure = (state, { errorMessage }) => ({
  ...state,
  routingWorkcenters: [],
  routingWorkcentersIsLoading: false,
  routingWorkcentersErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [RoutingWorkcentersTypes.FETCH_ROUTING_WORKCENTERS_LOADING]: fetchRoutingWorkcentersLoading,
  [RoutingWorkcentersTypes.FETCH_ROUTING_WORKCENTERS_SUCCESS]: fetchRoutingWorkcentersSuccess,
  [RoutingWorkcentersTypes.FETCH_ROUTING_WORKCENTERS_FAILURE]: fetchRoutingWorkcentersFailure,
})
