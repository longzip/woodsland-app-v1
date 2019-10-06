import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  primary: {
    marginRight: theme.spacing(2)
  },
  secondary: {
    background: theme.palette.secondary["100"],
    color: "white"
  },
  spaceTop: {
    marginTop: 20
  }
});

class ButtonBarWorkcenterProductivity extends Component {
  render() {
    const { classes, accepted } = this.props;

    return (
      <div className={classes.spaceTop}>
        {!accepted && (
          <Button className={classes.primary} onClick={this.props.handleAccept}>
            Xác nhận
          </Button>
        )}
        <Button
          disabled={!accepted}
          variant="contained"
          color="primary"
          className={classes.secondary}
          onClick={this.props.handleEdit}
        >
          Nhập số liệu
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonBarWorkcenterProductivity);
