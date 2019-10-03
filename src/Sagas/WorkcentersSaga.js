import { put, call } from "redux-saga/effects";
import WorkcentersActions from "../Stores/Workcenters/Actions";
import SelectedWorkcenterActions from "../Stores/SelectedWorkcenter/Actions";
import { workcentersService } from "../Services/WorkcentersService";

export function* fetchWorkcenters() {
  yield put(WorkcentersActions.fetchWorkcentersLoading());
  const workcenters = yield call(workcentersService.fetchWorkcenters);
  if (workcenters) {
    yield put(WorkcentersActions.fetchWorkcentersSuccess(workcenters));
  } else {
    yield put(
      WorkcentersActions.fetchWorkcentersFailure(
        "Có lỗi xảy ra khi tải dữ liệu Công đoạn sản xuất (workcenters)."
      )
    );
  }
}

export function* fetchWorkcenter({ id }) {
  yield put(SelectedWorkcenterActions.fetchWorkcenterLoading());
  const workcenter = yield call(workcentersService.fetchWorkcenter, id);
  if (workcenter) {
    yield put(SelectedWorkcenterActions.fetchWorkcenterSuccess(workcenter));
  } else {
    // yield put(
    //   SelectedworkcenterActions.fetchWorkcenterFailure(
    //     "Có lỗi xảy ra khi tải dữ liệu Lệnh sản xuất (workcenter)."
    //   )
    // );
  }
}
