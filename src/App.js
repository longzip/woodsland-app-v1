import React from "react";
import { connect } from "react-redux";
import { Typography, Link } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Routes from "./routes";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://woodsland.com.vn/">
        Woodsland
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export class App extends React.Component {
  render() {
    const { userAuth } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Routes userAuth={userAuth} />
        <Copyright />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  userAuth: state.loginedUserReducer.user
});

export default connect(mapStateToProps)(App);
