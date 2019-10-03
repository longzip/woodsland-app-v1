import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./components/Main";
import Login from "./components/Login";
import ScrollToTop from "./components/ScrollTop";
import WorkcenterDetailContainer from "./containers/Workcenters/WorkcenterDetailContainer";
import ProductionsContainer from "./containers/Productions/ProductionsContainer";
import ProductionDetailContainer from "./containers/Productions/ProductionDetailContainer";

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <PrivateRoute
          authed={this.props.userAuth}
          exact
          path="/"
          component={Main}
        />
        <PrivateRoute
          exact
          path="/productions"
          component={ProductionsContainer}
          authed={this.props.userAuth}
        />
        <PrivateRoute
          exact
          path="/production/:id"
          component={ProductionDetailContainer}
          authed={this.props.userAuth}
        />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          exact
          path="/workcenter/:id"
          component={WorkcenterDetailContainer}
          authed={this.props.userAuth}
        />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
