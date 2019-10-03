import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CardItem from "../../components/cards/CardItem";
import Topbar from "../../components/Topbar";
import SectionHeader from "../../components/typo/SectionHeader";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import SelectedWorkcenterActions from "../../Stores/SelectedWorkcenter/Actions";
import WorkcenterProductivitiesActions from "../../Stores/WorkcenterProductivities/Actions";
import WorkordersActions from "../../Stores/Workorders/Actions";
import { makeGetWorkcenterWorkorders } from "../../Stores/Selectors";
const backgroundShape = require("../../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["A500"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: 1000
  }
});

class WorkcenterDetailContainer extends Component {
  constructor() {
    super();
    this._saveWorkcenterProductivity = this._saveWorkcenterProductivity.bind(
      this
    );
  }
  componentDidMount() {
    console.log(this.props);
    this._fetchWorkcenter();
    this._fetchWorkorders();
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <SectionHeader
                  title="Cards"
                  subtitle="One page with a list of a collection"
                />
                {this.props.workorders.map((item, index) => (
                  <CardItem />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  _fetchWorkcenter() {
    if (this.props.match.params && this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchWorkcenter(id);
    }
  }

  _fetchWorkorders() {
    this.props.fetchWorkorders();
  }
  _saveWorkcenterProductivity(workcenterProductivityBeingAddedOrEdited) {
    this.props.saveWorkcenterProductivity(
      workcenterProductivityBeingAddedOrEdited
    );
    this._fetchWorkorders();
  }
}

WorkcenterDetailContainer.propTypes = {
  workcenter: PropTypes.object,
  workcenterIsLoading: PropTypes.bool,
  workcenterErrorMessage: PropTypes.string,
  fetchWorkcenter: PropTypes.func
};

const makeMapStateToProps = () => {
  const getWorkcenterWorkorders = makeGetWorkcenterWorkorders();
  const mapStateToProps = (state, props) => {
    return {
      workcenter: state.selectedWorkcenterReducer.workcenter,
      workcenterIsLoading: state.selectedWorkcenterReducer.workcenterIsLoading,
      workcenterErrorMessage:
        state.selectedWorkcenterReducer.workcenterErrorMessage,
      workorders: getWorkcenterWorkorders(state, props),
      workordersIsLoading: state.workordersReducer.workordersIsLoading,
      workordersErrorMessage: state.workordersReducer.workordersErrorMessage,
      //
      workcenterProductivitiesSuccessMessage:
        state.workcenterProductivitiesReducer
          .workcenterProductivitiesSuccessMessage,
      workcenterProductivitiesIsLoading:
        state.workcenterProductivitiesReducer.workcenterProductivitiesIsLoading,
      workcenterProductivitiesErrorMessage:
        state.workcenterProductivitiesReducer
          .workcenterProductivitiesErrorMessage
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  fetchWorkcenter: id =>
    dispatch(SelectedWorkcenterActions.fetchWorkcenter(id)),
  fetchWorkorders: () => dispatch(WorkordersActions.fetchWorkorders()),
  saveWorkcenterProductivity: workcenterProductivityBeingAddedOrEdited =>
    dispatch(
      WorkcenterProductivitiesActions.saveWorkcenterProductivity(
        workcenterProductivityBeingAddedOrEdited
      )
    )
});

export default withStyles(styles)(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(WorkcenterDetailContainer)
);
