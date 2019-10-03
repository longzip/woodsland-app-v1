import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchWorkorder: null,
  fetchWorkorderLoading: null,
  fetchWorkorderSuccess: ['workorder'],
  fetchWorkorderFailure: ['errorMessage'],
})

export const WorkorderTypes = Types
export default Creators
