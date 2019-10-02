import { put, call } from 'redux-saga/effects'
import WorkordersActions from 'App/Stores/Workorders/Actions'
import { workordersService } from 'App/Services/WorkordersService'

export function* fetchWorkorders({ productionId, workcenterId }) {
  yield put(WorkordersActions.fetchWorkordersLoading())
  const workorders = yield call(workordersService.fetchWorkorders, productionId, workcenterId)
  if (workorders) {
    yield put(WorkordersActions.fetchWorkordersSuccess(workorders))
  } else {
    yield put(
      WorkordersActions.fetchWorkordersFailure(
        'Có lỗi xảy ra khi tải dữ liệu Lệnh làm việc (workorders).'
      )
    )
  }
}
