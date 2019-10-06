import { createSelector } from "reselect";

// Get Workorders
const getWorkorders = state => state.workordersReducer.workorders;

const getWorkcenterFilter = (state, props) => parseInt(props.match.params.id);
const makeGetWorkcenterWorkorders = () => {
  return createSelector(
    [getWorkcenterFilter, getWorkorders],
    (workcenterFilter, workorders) =>
      workorders.filter(
        workorder => workorder.WorkcenterId === workcenterFilter
      )
  );
};

const getProductionFilter = (state, props) => parseInt(props.match.params.id);
const makeGetProductionWorkorders = () => {
  return createSelector(
    [getProductionFilter, getWorkorders],
    (productionFilter, workorders) =>
      workorders.filter(
        workorder => workorder.ProductionId === productionFilter
      )
  );
};

const getWorkorderFilter = (state, props) => props.workorder.id;

const getWorkcenterProductivities = state =>
  state.workcenterProductivitiesReducer.workcenterProductivities;

const makeGetWorkorderProductivities = () => {
  return createSelector(
    [getWorkorderFilter, getWorkcenterProductivities],
    (workorderFilter, workcenterProductivities) =>
      workcenterProductivities.filter(
        workcenterProductivity =>
          workcenterProductivity.WorkorderId === workorderFilter
      )
  );
};

const getNextWorkorderFilter = (state, props) =>
  props.workorder.nextWorkOrderId;
const makeGetNextWorkorderProductivities = () => {
  return createSelector(
    [getNextWorkorderFilter, getWorkcenterProductivities],
    (nextWorkorderFilter, workcenterProductivities) =>
      workcenterProductivities.filter(
        workcenterProductivity =>
          workcenterProductivity.WorkorderId === nextWorkorderFilter
      )
  );
};

export {
  makeGetWorkcenterWorkorders,
  makeGetProductionWorkorders,
  makeGetWorkorderProductivities,
  makeGetNextWorkorderProductivities
};
