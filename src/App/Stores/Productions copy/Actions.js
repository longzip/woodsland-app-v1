import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchProductions: null,
  fetchProductionsLoading: null,
  fetchProductionsSuccess: ['productions'],
  fetchProductionsFailure: ['errorMessage'],
})

export const ProductionsTypes = Types
export default Creators
