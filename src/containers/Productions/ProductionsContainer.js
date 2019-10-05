import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import {
  CssBaseline,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box
} from "@material-ui/core";
import ProductionsActions from "../../Stores/Productions/Actions";
import Topbar from "../../components/Topbar";
import ProductionsList from "./ProductionsList";
import styles from "./ProductionsContainerStyle";

class ProductionsContainer extends Component {
  componentDidMount() {
    this._fetchProductions();
  }

  render() {
    const {
      classes,
      productions,
      productionsIsLoading,
      productionsErrorMessage
    } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div>
          <Grid container justify="center">
            {productionsIsLoading ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CircularProgress disableShrink />
              </Grid>
            ) : productionsErrorMessage ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Typography variant="body1">
                  {productionsErrorMessage}
                </Typography>
                <Button onClick={() => this._fetchProductions()}>
                  Tải lại
                </Button>
              </Grid>
            ) : (
              <Grid
                alignItems="center"
                justify="center"
                container
                className={classes.grid}
              >
                <Grid item xs={12}>
                  <div className={classes.topBar}>
                    <div className={classes.block}>
                      <Typography variant="h6" gutterBottom>
                        Lệnh sản xuất
                      </Typography>
                      <Typography variant="body1">
                        Quản lý các lệnh sản xuất của nhà máy.
                      </Typography>
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        className={classes.outlinedButtom}
                        onClick={() => this.props.history.push("/production")}
                      >
                        Thêm
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <ProductionsList productions={productions} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
  _fetchProductions() {
    this.props.fetchProductions();
  }
}
ProductionsContainer.propTypes = {
  productions: PropTypes.array,
  productionsIsLoading: PropTypes.bool,
  productionsErrorMessage: PropTypes.string,
  fetchProductions: PropTypes.func,
  liveInEurope: PropTypes.bool
};

const mapStateToProps = state => ({
  productions: state.productionsReducer.productions,
  productionsIsLoading: state.productionsReducer.productionsIsLoading,
  productionsErrorMessage: state.productionsReducer.productionsErrorMessage
});

const mapDispatchToProps = dispatch => ({
  fetchProductions: () => dispatch(ProductionsActions.fetchProductions())
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductionsContainer)
);
