import { createSelector } from "reselect";

const getVisibilityFilter = (state, props) =>
  state.todoLists[props.listId].visibilityFilter;

const getTodos = (state, props) => state.todoLists[props.listId].todos;

const makeGetVisibleTodos = () => {
  return createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case "SHOW_COMPLETED":
          return todos.filter(todo => todo.completed);
        case "SHOW_ACTIVE":
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    }
  );
};

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

const getProductionFilter = (state, props) => props.production.id;
const makeGetProductionWorkorders = () => {
  return createSelector(
    [getProductionFilter, getWorkorders],
    (workcenterFilter, workorders) =>
      workorders.filter(
        workorder => workorder.ProductionId === getProductionFilter
      )
  );
};

const getWorkorderFilter = (state, props) => props.workorder.id;
const getNextWorkorderFilter = (state, props) =>
  props.workorder.nextWorkOrderId;

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
  makeGetVisibleTodos,
  makeGetWorkcenterWorkorders,
  makeGetProductionWorkorders,
  makeGetWorkorderProductivities,
  makeGetNextWorkorderProductivities
};
