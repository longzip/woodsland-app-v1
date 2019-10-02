import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchWorkcenters: null,
  fetchWorkcentersLoading: null,
  fetchWorkcentersSuccess: ['workcenters'],
  fetchWorkcentersFailure: ['errorMessage'],
})

export const WorkcentersTypes = Types
export default Creators
