import React, { Component } from "react";
import CardWorkorder from "../../components/cards/CardWorkorder";

export default class WorkorderList extends Component {
  render() {
    const { workorders, handleEdit } = this.props;
    return (
      <React.Fragment>
        {workorders.map((item, key) => (
          <CardWorkorder
            key={key}
            workorder={item}
            handleEdit={handleEdit(item)}
          />
        ))}
      </React.Fragment>
    );
  }
}
