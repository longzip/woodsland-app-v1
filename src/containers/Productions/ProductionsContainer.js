import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ProductionsActions from "../../Stores/Productions/Actions";
import CardProduction from "../../components/cards/CardProduction";
import { CssBaseline, Grid, Typography, Button } from "@material-ui/core";
import Topbar from "../../components/Topbar";
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
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
class ProductionsContainer extends Component {
  componentDidMount() {
    this._fetchProductions();
  }
  handleEdit(e) {
    this.props.history.push("/production/" + e.id + "/detail");
  }
  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div>
          <Grid container justify="center">
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
                {this.props.productions.map((item, key) => (
                  <CardProduction
                    key={key}
                    production={item}
                    handleEdit={this.handleEdit.bind(this, item)}
                  />
                ))}
              </Grid>
            </Grid>
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
