import { put, call } from 'redux-saga/effects'
import ProductionsActions from 'App/Stores/Productions/Actions'
import SelectedProductionActions from 'App/Stores/SelectedProduction/Actions'
import { productionsService } from 'App/Services/ProductionsService'

export function* fetchProductions() {
  yield put(ProductionsActions.fetchProductionsLoading())
  const productions = yield call(productionsService.fetchProductions)
  if (productions) {
    yield put(ProductionsActions.fetchProductionsSuccess(productions))
  } else {
    yield put(
      ProductionsActions.fetchProductionsFailure(
        'Có lỗi xảy ra khi tải dữ liệu Lệnh sản xuất (productions).'
      )
    )
  }
}
export function* fetchProductionTodo({ id }) {
  yield call(productionsService.fetchProductionTodo, id)
}

export function* fetchProduction({ id }) {
  yield put(SelectedProductionActions.fetchProductionLoading())
  const production = yield call(productionsService.fetchProduction, id)
  if (production) {
    yield put(SelectedProductionActions.fetchProductionSuccess(production))
  } else {
    yield put(
      SelectedProductionActions.fetchProductionFailure(
        'Có lỗi xảy ra khi tải dữ liệu Lệnh sản xuất (production).'
      )
    )
  }
}

export function* saveProduction(productionBeingAddedOrEdited) {
  yield put(SelectedProductionActions.fetchProductionLoading())
  const production = yield call(productionsService.saveProduction(productionBeingAddedOrEdited))
  if (production) {
    yield put(SelectedProductionActions.fetchProductionSuccess(production))
  } else {
    yield put(
      SelectedProductionActions.fetchProductionFailure(
        'Có lỗi xảy ra khi lưu dữ liệu Lệnh sản xuất (production).'
      )
    )
  }
}
