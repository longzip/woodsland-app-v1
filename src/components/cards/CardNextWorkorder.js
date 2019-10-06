import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonBar from "../buttons/ButtonBar";
import {
  makeGetWorkorderProductivities,
  makeGetNextWorkorderProductivities
} from "../../Stores/Selectors";
import { WorkcenterProductivitiesList } from "../../containers/Workcenters/WorkcenterProductivitiesList";
import styles from "./CardNextWorkorderStyle";

class CardNextWorkorder extends Component {
  render() {
    const {
      classes,
      edit = true,
      workorderProductivities,
      nextWorkorderProductivities,
      handleEdit,
      handleAccept
    } = this.props;
    const {
      productUom,
      factor,
      Production,
      Product,
      Workcenter
    } = this.props.workorder;
    return (
      <div className={classes.root}>
        {true ? (
          <Paper className={classes.paper}>
            <div className={classes.itemContainer}>
              <div className={classes.baseline}>
                <div className={classes.inline}>
                  <Typography
                    style={{ textTransform: "uppercase" }}
                    gutterBottom
                  >
                    {Production.name} / {Workcenter.name}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {Product.name}
                  </Typography>
                </div>
                <div className={classes.inline}>
                  <Typography
                    variant="h6"
                    style={{ textTransform: "uppercase" }}
                    gutterBottom
                  >
                    {Production.productDimension}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {productUom} x {factor}
                  </Typography>
                </div>
                <div className={classes.inlineRight}>
                  <Typography
                    style={{ textTransform: "uppercase" }}
                    gutterBottom
                  >
                    Cần thực hiện
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {Production.productQty}
                  </Typography>
                </div>
                <div className={classes.inline}>
                  <Typography
                    style={{ textTransform: "uppercase" }}
                    color="secondary"
                    gutterBottom
                  >
                    Đã thực hiện:{" "}
                    {this._workcenterProductivitiesNumber(
                      workorderProductivities
                    )}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Tồn tại tổ:
                    {nextWorkorderProductivities &&
                      this._workcenterProductivitiesNumber(
                        nextWorkorderProductivities
                      )}
                  </Typography>
                  {edit && <ButtonBar handleEdit={this.props.handleEdit} />}
                </div>
              </div>
            </div>
          </Paper>
        ) : (
          <WorkcenterProductivitiesList
            nextWorkorderProductivities={nextWorkorderProductivities}
            handleAccept={handleAccept}
            handleEdit={handleEdit}
          />
        )}
      </div>
    );
  }
  _workcenterProductivitiesNumber(workcenterProductivities) {
    return workcenterProductivities.reduce(
      (acc, item) => acc + item.qtyProduced,
      0
    );
  }
}

const makeMapStateToProps = () => {
  const getWorkorderProductivities = makeGetWorkorderProductivities();
  const getNextWorkorderProductivities = makeGetNextWorkorderProductivities();

  const mapStateToProps = (state, props) => {
    return {
      workorderProductivities: getWorkorderProductivities(state, props),
      nextWorkorderProductivities: getNextWorkorderProductivities(state, props)
    };
  };
  return mapStateToProps;
};

export default withStyles(styles)(
  connect(makeMapStateToProps)(CardNextWorkorder)
);
