import React, { Component } from "react";
import CardProduction from "../../components/cards/CardProduction";

export class ProductionsList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.productions.map((item, key) => (
          <CardProduction key={key} production={item} />
        ))}
      </React.Fragment>
    );
  }
}
export default ProductionsList;
