import { is, curryN, gte } from 'ramda'
import { apiClient } from './ApiClient'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

function fetchWorkorders(productionId, workcenterId) {
  return apiClient
    .get(`workorders?productionId=${productionId}&workcenterId=${workcenterId}`)
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.result
      }
      return null
    })
}

export const workordersService = {
  fetchWorkorders,
}
