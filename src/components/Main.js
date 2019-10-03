import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import WorkcentersActions from "../Stores/Workcenters/Actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Topbar from "./Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  }
});

class Main extends Component {
  state = {
    learnMoredialog: false,
    getStartedDialog: false
  };

  componentDidMount() {
    this._fetchWorkcenters();
  }

  render() {
    const { classes, workcenters } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
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
                      Công đoạn sản xuất
                    </Typography>
                    <Typography variant="body1">
                      Lựa chọn công đoạn để ghi nhận số liệu.
                    </Typography>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      className={classes.outlinedButtom}
                    >
                      Tìm hiểu
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div>
                    <List>
                      {workcenters.map((item, index) => (
                        <ListItem
                          component={Link}
                          href={null}
                          to={
                            item.external
                              ? null
                              : {
                                  pathname: `/workcenter/${item.id}`,
                                  search: this.props.location.search
                                }
                          }
                          button
                          key={item.name}
                        >
                          <ListItemText primary={item.name} />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  _fetchWorkcenters() {
    this.props.fetchWorkcenters();
  }
}

Main.propTypes = {
  workcenters: PropTypes.array,
  workcentersIsLoading: PropTypes.bool,
  workcentersErrorMessage: PropTypes.string,
  fetchWorkcenters: PropTypes.func,
  liveInEurope: PropTypes.bool
};

const mapStateToProps = state => ({
  workcenters: state.workcentersReducer.workcenters,
  workcentersIsLoading: state.workcentersReducer.workcentersIsLoading,
  workcentersErrorMessage: state.workcentersReducer.workcentersErrorMessage
});

const mapDispatchToProps = dispatch => ({
  fetchWorkcenters: () => dispatch(WorkcentersActions.fetchWorkcenters())
});
export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Main)
  )
);
