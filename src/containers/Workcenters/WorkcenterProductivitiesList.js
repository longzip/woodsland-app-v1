import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import CardWorkorderProductivity from "../../components/cards/CardWorkorderProductivity";
import { makeGetNextWorkorderProductivities } from "../../Stores/Selectors";
import WorkcenterProductivitiesActions from "../../Stores/WorkcenterProductivities/Actions";
import styles from "./WorkcenterDetailContainerStyle";

export class WorkcenterProductivitiesList extends Component {
  constructor(props) {
    super(props);
  }
  handleAccept(item) {
    console.log("Accept Item:");
    console.log(item);
  }

  handleSave(item) {
    console.log("Save Item");
    console.log(item);
  }
  render() {
    const { nextWorkorderProductivities } = this.props;
    return (
      <React.Fragment>
        {nextWorkorderProductivities.map((item, key) => (
          <CardWorkorderProductivity
            key={key}
            workcenterProductivity={item}
            handleAccept={() => this.props.handleAccept(item)}
            handleEdit={() => this.props.handleEdit(item)}
          />
        ))}
      </React.Fragment>
    );
  }
}
const makeMapStateToProps = () => {
  const getNextWorkorderProductivities = makeGetNextWorkorderProductivities();
  const mapStateToProps = (state, props) => {
    return {
      workcenterProductivities: getNextWorkorderProductivities(state, props)
    };
  };
  return mapStateToProps;
};
const mapDispatchToProps = dispatch => ({
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
  )(WorkcenterProductivitiesList)
);
