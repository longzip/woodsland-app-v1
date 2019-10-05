import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonBarWorkcenterProductivity from "../buttons/ButtonBarWorkcenterProductivity";

class CardWorkorderProductivity extends Component {
  render() {
    const { classes, edit = true } = this.props;
    const {
      Product,
      Contact,
      Production,
      qtyProduced,
      productUom,
      updatedAt,
      accepted
    } = this.props.workcenterProductivity;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Typography style={{ textTransform: "uppercase" }} gutterBottom>
                  Dự án: {Contact && Contact.name}
                </Typography>
                <Typography gutterBottom>Mã SP: {Product.code}</Typography>
              </div>
              <div className={classes.inline}>
                <Typography style={{ textTransform: "uppercase" }} gutterBottom>
                  Chi tiết: {Product.name}
                </Typography>
                <Typography gutterBottom>
                  Quy cách: {Production.productDimension}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography style={{ textTransform: "uppercase" }} gutterBottom>
                  Số lượng: {qtyProduced}
                </Typography>
                <Typography gutterBottom>Đơn vị: {productUom}</Typography>
              </div>
              <div className={classes.inline}>
                <Typography gutterBottom>
                  Ngày: {updatedAt.slice(0, 10)}
                </Typography>
              </div>
              <div className={classes.inline}>
                {edit && (
                  <ButtonBarWorkcenterProductivity
                    accepted={accepted}
                    handleEdit={this.props.handleEdit}
                    handleAccept={this.props.handleAccept}
                  />
                )}
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

// const makeMapStateToProps = () => {
//   const getWorkorderProductivities = makeGetWorkorderProductivities();
//   const getNextWorkorderProductivities = makeGetNextWorkorderProductivities();

//   const mapStateToProps = (state, props) => {
//     return {
//       workorderProductivities: getWorkorderProductivities(state, props),
//       nextworkorderProductivities: getNextWorkorderProductivities(state, props)
//     };
//   };
//   return mapStateToProps;
// };

export default withStyles(styles)(CardWorkorderProductivity);
