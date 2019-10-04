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

class CardItem extends Component {
  render() {
    const {
      classes,
      workorderProductivities,
      nextworkorderProductivities,
      edit = true
    } = this.props;
    const {
      productUom,
      factor,
      Production,
      Product,
      Workcenter
    } = this.props.workorder;

    console.log(this.props);

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Typography style={{ textTransform: "uppercase" }} gutterBottom>
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
                <Typography style={{ textTransform: "uppercase" }} gutterBottom>
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
                  {nextworkorderProductivities &&
                    this._workcenterProductivitiesNumber(
                      nextworkorderProductivities
                    )}
                </Typography>
                {edit && <ButtonBar handleEdit={this.props.handleEdit} />}
              </div>
            </div>
          </div>
        </Paper>
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

const styles = theme => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  avatar: {
    margin: 10,
    backgroundColor: theme.palette.grey["200"],
    color: theme.palette.text.primary
  },
  avatarContainer: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginBottom: theme.spacing(4)
    }
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  baseline: {
    alignSelf: "baseline",
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: 0
    }
  },
  inline: {
    display: "inline-block",
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  inlineRight: {
    width: "30%",
    textAlign: "right",
    marginLeft: 50,
    alignSelf: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
      textAlign: "center"
    }
  },
  backButton: {
    marginRight: theme.spacing(2)
  }
});

const makeMapStateToProps = () => {
  const getWorkorderProductivities = makeGetWorkorderProductivities();
  const getNextWorkorderProductivities = makeGetNextWorkorderProductivities();

  const mapStateToProps = (state, props) => {
    return {
      workorderProductivities: getWorkorderProductivities(state, props),
      nextworkorderProductivities: getNextWorkorderProductivities(state, props)
    };
  };
  return mapStateToProps;
};

export default withStyles(styles)(connect(makeMapStateToProps)(CardItem));
