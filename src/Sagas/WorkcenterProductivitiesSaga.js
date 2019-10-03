import { put, call } from "redux-saga/effects";
import WorkcenterProductivitiesActions from "../Stores/WorkcenterProductivities/Actions";
import { workcenterProductivitiesService } from "../Services/WorkcenterProductivitiesService";

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
  } else {
    yield put(
      WorkcenterProductivitiesActions.saveWorkcenterProductivityFailure(
        "Có lỗi xảy ra khi lưu dữ liệu Hoạt động sản xuất (workorderProductivity)."
      )
    );
  }
}
