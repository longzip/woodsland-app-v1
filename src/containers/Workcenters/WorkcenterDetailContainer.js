import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CardNextWorkorder from "../../components/cards/CardNextWorkorder";
import Topbar from "../../components/Topbar";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectedWorkcenterActions from "../../Stores/SelectedWorkcenter/Actions";
import WorkcenterProductivitiesActions from "../../Stores/WorkcenterProductivities/Actions";
import WorkordersActions from "../../Stores/Workorders/Actions";
import { makeGetWorkcenterWorkorders } from "../../Stores/Selectors";
import BackWorkcenter from "../../components/common/BackWorkcenter";
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
    this.handleClose = this.handleClose.bind(this);
    // this.handleAccept = this.handleAccept.bind(this);
    this.handleClickOpenAccept = this.handleClickOpenAccept.bind(this);
  }
  componentDidMount() {
    this._fetchWorkcenter();
    this._fetchWorkorders();
    this.props.fetchWorkcenterProductivities();
  }

  handleClickOpen(item) {
    this.setState(() => ({ item }));
    this.setState({ open: true });
  }

  handleClickOpenAccept(item) {
    console.log("item jfsjdkfjsljfsjfjskdfjksdfjsd");
    console.log(item);
    // this.setState(() => ({ item, openAccept: true }));
  }

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
    const { classes, workorders } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
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
                {workorders.map((item, key) => (
                  <CardNextWorkorder
                    key={key}
                    workorder={item}
                    handleAccept={this.handleClickOpenAccept}
                    handleEdit={this.handleClickOpen.bind(this, item)}
                  />
                ))}
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
                Ghi nhận số liệu đã nhận của công đoạn trước, để thực hiện sản
                xuất.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Hủy
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Ghi nhận
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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
    // console.log(workcenterProductivity);
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
