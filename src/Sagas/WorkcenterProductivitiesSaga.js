import { put, call } from "redux-saga/effects";
import WorkcenterProductivitiesActions from "../Stores/WorkcenterProductivities/Actions";
import { workcenterProductivitiesService } from "../Services/WorkcenterProductivitiesService";

export function* fetchWorkcenterProductivities() {
  yield put(
    WorkcenterProductivitiesActions.fetchWorkcenterProductivitiesLoading()
  );
  const workcenterProductivities = yield call(
    workcenterProductivitiesService.fetchWorkcenterProductivities
  );
  if (workcenterProductivities) {
    yield put(
      WorkcenterProductivitiesActions.fetchWorkcenterProductivitiesSuccess(
        workcenterProductivities
      )
    );
  } else {
    yield put(
      WorkcenterProductivitiesActions.fetchWorkcenterProductivitiesFailure(
        "Có lỗi xảy ra khi tải dữ liệu Hoạt độn sản xuất (workcenterProductivities)."
      )
    );
  }
}

export function* saveWorkcenterProductivity({
  workcenterProductivityBeingAddedOrEdited
}) {
  const workcenterProductivity = yield call(
    workcenterProductivitiesService.saveWorkcenterProductivity,
    workcenterProductivityBeingAddedOrEdited
  );
  if (workcenterProductivity) {
    yield put(
      WorkcenterProductivitiesActions.saveWorkcenterProductivitySuccess(
        "Đã ghi số liệu"
      )
    );
    const workcenterProductivities = yield call(
      workcenterProductivitiesService.fetchWorkcenterProductivities
    );
    if (workcenterProductivities) {
      yield put(
        WorkcenterProductivitiesActions.fetchWorkcenterProductivitiesSuccess(
          workcenterProductivities
        )
      );
    } else {
      yield put(
        WorkcenterProductivitiesActions.fetchWorkcenterProductivitiesFailure(
          "Có lỗi xảy ra khi tải dữ liệu Hoạt độn sản xuất (workcenterProductivities)."
        )
      );
    }
  } else {
    yield put(
      WorkcenterProductivitiesActions.saveWorkcenterProductivityFailure(
        "Có lỗi xảy ra khi lưu dữ liệu Hoạt động sản xuất (workorderProductivity)."
      )
    );
  }
}
