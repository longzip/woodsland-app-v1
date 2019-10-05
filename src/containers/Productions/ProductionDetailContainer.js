import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Grid from "@material-ui/core/Grid";
import SelectedProductionActions from "../../Stores/SelectedProduction/Actions";
import WorkordersActions from "../../Stores/Workorders/Actions";
import Back from "../../components/common/Back";
import CardWorkorder from "../../components/cards/CardWorkorder";
import { makeGetProductionWorkorders } from "../../Stores/Selectors";
const backgroundShape = require("../../images/shape.svg");

class ProductionDetailContainer extends Component {
  componentDidMount() {
    this._fetchProduction();
    this._fetchWorkorders();
  }
  render() {
    console.log(this.props);
    const { classes } = this.props;
    const { production, workorders } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Back name={production.name} pathname="/productions" />
          <Grid container justify="center">
            <Grid item xs={12}>
              {workorders.map((item, key) => (
                <CardWorkorder
                  key={key}
                  workorder={item}
                  handleEdit={null}
                  edit={false}
                />
              ))}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
  _fetchProduction() {
    if (this.props.match.params && this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchProduction(id);
    }
  }
  _fetchProductionTodo() {
    if (this.props.match.params && this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchProductionTodo(id);
    }
    this._fetchWorkorders();
  }
  _fetchWorkorders() {
    if (this.props.match.params && this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchWorkorders(id);
    }
  }

  _workcenterProductivitiesNumber(workcenterProductivities) {
    return workcenterProductivities.reduce(
      (acc, item) => acc + item.qtyProduced,
      0
    );
  }
}

ProductionDetailContainer.propTypes = {
  production: PropTypes.object,
  productionIsLoading: PropTypes.bool,
  productionErrorMessage: PropTypes.string,
  fetchProduction: PropTypes.func,
  saveProduction: PropTypes.func
};

const makeMapStateToProps = () => {
  const getProductionWorkorders = makeGetProductionWorkorders();
  const mapStateToProps = (state, props) => {
    return {
      production: state.selectedProductionReducer.production,
      productionIsLoading: state.selectedProductionReducer.productionIsLoading,
      productionErrorMessage:
        state.selectedProductionReducer.productionErrorMessage,
      //Workorder
      workorders: getProductionWorkorders(state, props),
      workordersIsLoading: state.workordersReducer.workordersIsLoading,
      workordersErrorMessage: state.workordersReducer.workordersErrorMessage
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  fetchProduction: id =>
    dispatch(SelectedProductionActions.fetchProduction(id)),
  fetchProductionTodo: id =>
    dispatch(SelectedProductionActions.fetchProductionTodo(id)),
  fetchWorkorders: productionId =>
    dispatch(WorkordersActions.fetchWorkorders(productionId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary["A100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  }
});

export default withRouter(
  withStyles(styles)(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(ProductionDetailContainer)
  )
);
