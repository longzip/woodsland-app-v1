import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ProductionsActions from "../../Stores/Productions/Actions";
import CardProduction from "../../components/cards/CardProduction";
import { CssBaseline, Grid } from "@material-ui/core";
import Topbar from "../../components/Topbar";
import SectionHeader from "../../components/typo/SectionHeader";
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
class ProductionsContainer extends Component {
  componentDidMount() {
    this._fetchProductions();
  }
  handleEdit(e) {
    this.props.history.push("/production/" + e.id);
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
                <SectionHeader
                  title="Lệnh sản xuất"
                  subtitle="Chọn lệnh sản xuất để thực hiện."
                />
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
