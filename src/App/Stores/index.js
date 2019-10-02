import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as productionsReducer } from './Productions/Reducers'
import { reducer as selectedProductionReducer } from './SelectedProduction/Reducers'
import { reducer as workordersReducer } from './Workorders/Reducers'
import { reducer as workcentersReducer } from './Workcenters/Reducers'
import { reducer as selectedWorkorderReducer } from './SelectedWorkorder/Reducers'
import { reducer as selectedWorkcenterReducer } from './SelectedWorkcenter/Reducers'
// import { reducer as routingWorkcentersReducer } from './RoutingWorkcenters/Reducers'
import { reducer as workcenterProductivitiesReducer } from './WorkcenterProductivities/Reducers'

export default () => {
  const rootReducer = combineReducers({
    // example: ExampleReducer,
    productionsReducer,
    selectedProductionReducer,
    workordersReducer,
    workcentersReducer,
    selectedWorkorderReducer,
    // routingWorkcentersReducer,
    selectedWorkcenterReducer,
    workcenterProductivitiesReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
