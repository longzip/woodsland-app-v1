import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchRoutingWorkcenters: null,
  fetchRoutingWorkcentersLoading: null,
  fetchRoutingWorkcentersSuccess: ['routingWorkcenters'],
  fetchRoutingWorkcentersFailure: ['errorMessage'],
})

export const RoutingWorkcentersTypes = Types
export default Creators
