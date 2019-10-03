import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Routes from "./routes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

function Copyright() {
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
}

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
