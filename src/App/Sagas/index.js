import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { ProductionsTypes } from 'App/Stores/Productions/Actions'
import { WorkcentersTypes } from 'App/Stores/Workcenters/Actions'
import { fetchWorkcenters, fetchWorkcenter } from './WorkcentersSaga'
import { WorkordersTypes } from 'App/Stores/Workorders/Actions'
import { SelectedProductionTypes } from 'App/Stores/SelectedProduction/Actions'
import { SelectedWorkcenterTypes } from 'App/Stores/SelectedWorkcenter/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchUser } from './ExampleSaga'
import { fetchProductions, fetchProduction, fetchProductionTodo } from './ProductionsSaga'
import { fetchWorkorders } from './WorkordersSaga'
import { WorkcenterProductivitiesTypes } from '../Stores/WorkcenterProductivities/Actions'
import { saveWorkcenterProductivity } from './WorkcenterProductivitiesSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(ProductionsTypes.FETCH_PRODUCTIONS, fetchProductions),
    takeLatest(WorkordersTypes.FETCH_WORKORDERS, fetchWorkorders),
    takeLatest(WorkcentersTypes.FETCH_WORKCENTERS, fetchWorkcenters),
    takeLatest(SelectedProductionTypes.FETCH_PRODUCTION_TODO, fetchProductionTodo),
    takeLatest(SelectedWorkcenterTypes.FETCH_WORKCENTER, fetchWorkcenter),
    takeEvery(SelectedProductionTypes.FETCH_PRODUCTION, fetchProduction),
    takeEvery(
      WorkcenterProductivitiesTypes.SAVE_WORKCENTER_PRODUCTIVITY,
      saveWorkcenterProductivity
    ),
  ])
}
