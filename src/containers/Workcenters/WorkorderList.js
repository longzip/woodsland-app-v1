import React, { Component } from "react";
import CardWorkorder from "../../components/cards/CardWorkorder";

export default class WorkorderList extends Component {
  render() {
    const { workorders, handleEdit } = this.props;
    return (
      <div>
        {workorders.map((item, key) => (
          <CardWorkorder
            key={key}
            workorder={item}
            handleEdit={handleEdit.bind(this, item)}
          />
        ))}
      </div>
    );
  }
}
