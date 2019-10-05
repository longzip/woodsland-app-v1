import React, { Component } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import { connect } from "react-redux";
import Back from "../../components/common/Back";
import ProductionForm from "./ProductionForm";
//
import showResults from "./showResults";

const backgroundShape = require("../../images/shape.svg");

class AddOrEditProductionContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <Back name="Quay lại lệnh sản xuất" pathname="/productions" />

                {/* <SectionHeader
                  title="Thêm lệnh sản xuất"
                  subtitle="Mời bạn nhập thông tin lệnh sản xuất theo biểu mẫu và nhấn vào nút thêm ở dưới."
                /> */}
                <ProductionForm onSubmit={showResults} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
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
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddOrEditProductionContainer)
);
