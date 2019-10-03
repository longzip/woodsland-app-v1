import { takeLatest, takeEvery, all } from "redux-saga/effects";
import { SelectedProductionTypes } from "../Stores/SelectedProduction/Actions";
import { SelectedWorkcenterTypes } from "../Stores/SelectedWorkcenter/Actions";
import { ProductionsTypes } from "../Stores/Productions/Actions";
import { WorkcentersTypes } from "../Stores/Workcenters/Actions";
import { WorkordersTypes } from "../Stores/Workorders/Actions";
import { WorkcenterProductivitiesTypes } from "../Stores/WorkcenterProductivities/Actions";
import { fetchWorkcenters, fetchWorkcenter } from "./WorkcentersSaga";
import {
  fetchProductions,
  fetchProduction,
  fetchProductionTodo
} from "./ProductionsSaga";
import { fetchWorkorders } from "./WorkordersSaga";
import { saveWorkcenterProductivity } from "./WorkcenterProductivitiesSaga";

export default function* root() {
  yield all([
    takeLatest(ProductionsTypes.FETCH_PRODUCTIONS, fetchProductions),
    takeLatest(WorkordersTypes.FETCH_WORKORDERS, fetchWorkorders),
    takeLatest(WorkcentersTypes.FETCH_WORKCENTERS, fetchWorkcenters),
    takeLatest(
      SelectedProductionTypes.FETCH_PRODUCTION_TODO,
      fetchProductionTodo
    ),
    takeLatest(SelectedWorkcenterTypes.FETCH_WORKCENTER, fetchWorkcenter),
    takeEvery(SelectedProductionTypes.FETCH_PRODUCTION, fetchProduction),
    takeEvery(
      WorkcenterProductivitiesTypes.SAVE_WORKCENTER_PRODUCTIVITY,
      saveWorkcenterProductivity
    )
  ]);
}
