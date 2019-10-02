import { put, call } from 'redux-saga/effects'
import RoutingWorkcentersActions from 'App/Stores/RoutingWorkcenters/Actions'
import { routingWorkcentersService } from 'App/Services/RoutingWorkcentersService'

export function* fetchRoutingWorkcenters({ routingId }) {
  yield put(RoutingWorkcentersActions.fetchRoutingWorkcentersLoading())
  const routingWorkcenters = yield call(
    routingWorkcentersService.fetchRoutingWorkcenters,
    routingId
  )
  if (routingWorkcenters) {
    yield put(RoutingWorkcentersActions.fetchRoutingWorkcentersSuccess(routingWorkcenters))
  } else {
    yield put(
      RoutingWorkcentersActions.fetchRoutingWorkcentersFailure(
        'Có lỗi xảy ra khi tải dữ liệu Công đoạn sản xuất (routingWorkcenters).'
      )
    )
  }
}
