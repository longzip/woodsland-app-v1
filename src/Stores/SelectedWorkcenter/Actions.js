import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchWorkcenter: ["id"],
  fetchWorkcenterLoading: null,
  fetchWorkcenterSuccess: ["workcenter"],
  fetchWorkcenterFailure: ["errorMessage"]
});

export const SelectedWorkcenterTypes = Types;
export default Creators;
