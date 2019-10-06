import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import {
  CssBaseline,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress
} from "@material-ui/core";
import WorkordersList from "../Workorders/WorkordersList";
import Topbar from "../../components/Topbar";
import SelectedWorkcenterActions from "../../Stores/SelectedWorkcenter/Actions";
import WorkcenterProductivitiesActions from "../../Stores/WorkcenterProductivities/Actions";
import WorkordersActions from "../../Stores/Workorders/Actions";
import { makeGetWorkcenterWorkorders } from "../../Stores/Selectors";
import BackWorkcenter from "../../components/common/BackWorkcenter";
import styles from "./WorkcenterDetailContainerStyle";

class WorkcenterDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      openAccept: false,
      textInputValue: "",
      item: {}
    };
    this._saveWorkcenterProductivity = this._saveWorkcenterProductivity.bind(
      this
    );
    this._acceptWorkcenterProductivity = this._acceptWorkcenterProductivity.bind(
      this
    );
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this._fetchWorkcenter();
    this._fetchWorkorders();
    this.props.fetchWorkcenterProductivities();
  }

  handleClickOpen = item => {
    this.setState(() => ({ item }));
    this.setState({ open: true });
  };

  handleClickOpenAccept = item => {
    this.setState(() => ({ item }));
    this.setState({ openAccept: true });
  };

  handleClose() {
    this.setState({ open: false, openAccept: false });
  }
  handleChange = event => {
    const {
      target: { value }
    } = event;
    this.setState(() => ({ textInputValue: value }));
  };

  render() {
    const {
      classes,
      workorders,
      workcenterIsLoading,
      workcenterErrorMessage,
      workordersIsLoading,
      workordersErrorMessage
    } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        {workcenterIsLoading && workordersIsLoading ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <CircularProgress disableShrink />
          </Grid>
        ) : workcenterErrorMessage && workordersErrorMessage ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography variant="body1">
              {workcenterErrorMessage && workcenterErrorMessage}
              {workordersErrorMessage && workordersErrorMessage}
            </Typography>
            {<Button onClick={() => this._fetchWorkorders()}>Tải lại</Button>}
          </Grid>
        ) : (
          <div>
            <CssBaseline />
            <Topbar currentPath={currentPath} />
            <BackWorkcenter name={this.props.workcenter.name} />
            <div className={classes.root}>
              <Grid container justify="center">
                <Grid
                  alignItems="center"
                  justify="center"
                  container
                  className={classes.grid}
                >
                  <Grid item xs={12}>
                    <WorkordersList
                      workorders={workorders}
                      handleEdit={this.handleClickOpen}
                      handleAccept={this.handleClickOpenAccept}
                      handleSave={this.handleClickOpen}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Nhập số liệu</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Bạn đã sản xuất được bao nhiêu? Ghi nhận số liệu tại ô trống
                    dưới đây.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Số lượng"
                    type="number"
                    fullWidth
                    value={this.state.textInputValue}
                    onChange={this.handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Hủy
                  </Button>
                  <Button
                    onClick={this._saveWorkcenterProductivity}
                    color="primary"
                  >
                    Ghi nhận
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Accept */}
              <Dialog
                open={this.state.openAccept}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Nhận pallet</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Ghi nhận số liệu đã nhận của công đoạn trước, để thực hiện
                    sản xuất.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Hủy
                  </Button>
                  <Button
                    onClick={this._acceptWorkcenterProductivity}
                    color="primary"
                  >
                    Ghi nhận
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  _fetchWorkcenter() {
    if (this.props.match.params && this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchWorkcenter(id);
    }
  }

  _fetchWorkorders() {
    this.props.fetchWorkorders();
  }
  _acceptWorkcenterProductivity() {
    const { id } = this.state.item;
    const workcenterProductivity = {
      id,
      accepted: true
    };
    this.props.saveWorkcenterProductivity(workcenterProductivity);
    this.setState({ openAccept: false });
  }
  _saveWorkcenterProductivity() {
    const {
      id,
      ProductionId,
      WorkcenterId,
      ProductId,
      productUom
    } = this.state.item;
    const workcenterProductivity = {
      ProductionId,
      WorkorderId: id,
      ProductId,
      WorkcenterId,
      qtyProduced: this.state.textInputValue,
      productUom
    };
    this.props.saveWorkcenterProductivity(workcenterProductivity);
    this.setState({ open: false });
    this.setState(() => ({ textInputValue: "" }));
  }
}

WorkcenterDetailContainer.propTypes = {
  workcenter: PropTypes.object,
  workcenterIsLoading: PropTypes.bool,
  workcenterErrorMessage: PropTypes.string,
  fetchWorkcenter: PropTypes.func
};

const makeMapStateToProps = () => {
  const getWorkcenterWorkorders = makeGetWorkcenterWorkorders();
  const mapStateToProps = (state, props) => {
    return {
      workcenter: state.selectedWorkcenterReducer.workcenter,
      workcenterIsLoading: state.selectedWorkcenterReducer.workcenterIsLoading,
      workcenterErrorMessage:
        state.selectedWorkcenterReducer.workcenterErrorMessage,
      workorders: getWorkcenterWorkorders(state, props),
      workordersIsLoading: state.workordersReducer.workordersIsLoading,
      workordersErrorMessage: state.workordersReducer.workordersErrorMessage
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  fetchWorkcenter: id =>
    dispatch(SelectedWorkcenterActions.fetchWorkcenter(id)),
  fetchWorkorders: () => dispatch(WorkordersActions.fetchWorkorders()),
  saveWorkcenterProductivity: workcenterProductivityBeingAddedOrEdited =>
    dispatch(
      WorkcenterProductivitiesActions.saveWorkcenterProductivity(
        workcenterProductivityBeingAddedOrEdited
      )
    ),
  fetchWorkcenterProductivities: () =>
    dispatch(WorkcenterProductivitiesActions.fetchWorkcenterProductivities())
});

export default withStyles(styles)(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(WorkcenterDetailContainer)
);
