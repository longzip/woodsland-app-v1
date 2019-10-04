import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchWorkcenterProductivities: null,
  fetchWorkcenterProductivitiesLoading: null,
  fetchWorkcenterProductivitiesSuccess: ["workcenterProductivities"],
  fetchWorkcenterProductivitiesFailure: ["errorMessage"],
  saveWorkcenterProductivity: ["workcenterProductivityBeingAddedOrEdited"],
  saveWorkcenterProductivitySuccess: ["successMessage"],
  saveWorkcenterProductivityFailure: ["errorMessage"]
});

export const WorkcenterProductivitiesTypes = Types;
export default Creators;
