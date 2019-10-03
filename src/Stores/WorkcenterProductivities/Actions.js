import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  saveWorkcenterProductivity: null,
  saveWorkcenterProductivitySuccess: ['successMessage'],
  saveWorkcenterProductivityFailure: ['errorMessage'],
})

export const WorkcenterProductivitiesTypes = Types
export default Creators
