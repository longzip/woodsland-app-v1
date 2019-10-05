import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
import Main from "./components/Main";
import Login from "./components/Login";
import ScrollToTop from "./components/ScrollTop";
import WorkcenterDetailContainer from "./containers/Workcenters/WorkcenterDetailContainer";
import ProductionsContainer from "./containers/Productions/ProductionsContainer";
import ProductionDetailContainer from "./containers/Productions/ProductionDetailContainer";
import AddOrEditProductionContainer from "./containers/Productions/AddOrEditProductionContainer";

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route authed={props.userAuth} exact path="/" component={Main} />
        <Route
          exact
          path="/productions"
          component={ProductionsContainer}
          authed={props.userAuth}
        />
        <Route
          exact
          path="/production/:id/detail"
          component={ProductionDetailContainer}
          authed={props.userAuth}
        />
        <Route
          exact
          path="/production/:id"
          component={AddOrEditProductionContainer}
          authed={props.userAuth}
        />
        <Route
          exact
          path="/production"
          component={AddOrEditProductionContainer}
          authed={props.userAuth}
        />

        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/workcenter/:id"
          component={WorkcenterDetailContainer}
          authed={props.userAuth}
        />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
