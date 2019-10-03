import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import ButtonBarProduction from "../buttons/ButtonBarProduction";

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

class CardItem extends Component {
  render() {
    const { classes, production } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.itemContainer}>
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>
                <DescriptionIcon />
              </Avatar>
            </div>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  color="secondary"
                  gutterBottom
                >
                  {production.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {production.datePlannedFinished}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  color="secondary"
                  gutterBottom
                >
                  {production.Product && production.Product.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {production.productDimension}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  color="secondary"
                  gutterBottom
                >
                  {production.productQty}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {production.productUom} / {production.factor}
                </Typography>
              </div>
            </div>
            <div className={classes.inlineRight}>
              <Typography
                style={{ textTransform: "uppercase" }}
                color="secondary"
                gutterBottom
              >
                Other Amount
              </Typography>
              <Typography variant="h4" gutterBottom>
                Once a month
              </Typography>
              <ButtonBarProduction handleEdit={this.props.handleEdit} />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CardItem);
