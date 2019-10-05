import React, { Component } from "react";
import { connect } from "react-redux";
import CardWorkorderProductivity from "../../components/cards/CardWorkorderProductivity";

export default class WorkcenterProductivitiesList extends Component {
  render() {
    const { workcenterProductivities, handleEdit, handleAccept } = this.props;
    console.log(workcenterProductivities);
    return (
      <div>
        {workcenterProductivities.map((item, key) => (
          <CardWorkorderProductivity
            key={key}
            workcenterProductivity={item}
            handleAccept={handleAccept(item)}
            handleEdit={handleEdit(item)}
          />
        ))}
      </div>
    );
  }
}
