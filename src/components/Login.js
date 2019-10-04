import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import DoneIcon from "@material-ui/icons/Done";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Fade from "@material-ui/core/Fade";
// import Back from "./common/Back";

const backgroundShape = require("../images/shape.svg");

const logo = require("../images/logo.jpg");

const numeral = require("numeral");
numeral.defaultFormat("0");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary["A100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  logo: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "center"
  },
  smallContainer: {},
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {}

  handleChange(event) {
    console.log(event);
  }

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
                <div className={classes.logo}>
                  <img width={180} height={180} src={logo} alt="" />
                </div>
                <div className={classes.stepContainer}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    Đăng nhập hệ thống
                  </Typography>
                </div>
                <div className={classes.smallContainer}>
                  <Paper className={classes.paper}>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        onChange={this.handleChange.bind(this)}
                        margin="normal"
                      />
                    </form>
                  </Paper>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
