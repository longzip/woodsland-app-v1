import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas";
import { reducer as productionsReducer } from "./Productions/Reducers";
import { reducer as selectedProductionReducer } from "./SelectedProduction/Reducers";
import { reducer as workordersReducer } from "./Workorders/Reducers";
import { reducer as workcentersReducer } from "./Workcenters/Reducers";
import { reducer as selectedWorkorderReducer } from "./SelectedWorkorder/Reducers";
import { reducer as selectedWorkcenterReducer } from "./SelectedWorkcenter/Reducers";
import { reducer as workcenterProductivitiesReducer } from "./WorkcenterProductivities/Reducers";
import { reducer as loginedUserReducer } from "./LoginedUser/Reducers";

export default () => {
  const rootReducer = combineReducers({
    form: reduxFormReducer,
    productionsReducer,
    selectedProductionReducer,
    workordersReducer,
    workcentersReducer,
    selectedWorkorderReducer,
    selectedWorkcenterReducer,
    workcenterProductivitiesReducer,
    loginedUserReducer
  });

  return configureStore(rootReducer, rootSaga);
};
