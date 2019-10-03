import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Routes from "./routes";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import createStore from "./Stores";
import theme from "./theme";

const { store, persistor } = createStore();

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

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Routes />
          <Copyright />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
