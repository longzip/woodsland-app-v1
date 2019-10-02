import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchWorkorders: null,
  fetchWorkordersLoading: null,
  fetchWorkordersSuccess: ['workorders'],
  fetchWorkordersFailure: ['errorMessage'],
})

export const WorkordersTypes = Types
export default Creators
