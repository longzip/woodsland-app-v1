import { is, curryN, gte } from 'ramda'
import { apiClient } from './ApiClient'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

function fetchRoutingWorkcenters() {
  return apiClient.get('routingworkcenters').then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

export const routingWorkcentersService = {
  fetchRoutingWorkcenters,
}
