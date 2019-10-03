import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Wizard from "./components/Wizard";
import Cards from "./components/Cards";
import Main from "./components/Main";
import Signup from "./components/Signup";
import ScrollToTop from "./components/ScrollTop";
import WorkcenterDetailContainer from "./containers/Workcenters/WorkcenterDetailContainer";
import ProductionsContainer from "./containers/Productions/ProductionsContainer";
import ProductionDetailContainer from "./containers/Productions/ProductionDetailContainer";

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/productions" component={ProductionsContainer} />
        <Route
          exact
          path="/production/:id"
          component={ProductionDetailContainer}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/wizard" component={Wizard} />
        <Route exact path="/cards" component={Cards} />
        <Route
          exact
          path="/workcenter/:id"
          component={WorkcenterDetailContainer}
        />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
