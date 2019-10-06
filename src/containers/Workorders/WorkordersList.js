import React, { Component } from "react";
import CardNextWorkorder from "../../components/cards/CardNextWorkorder";
export default class WorkordersList extends Component {
  render() {
    const { workorders, handleEdit, handleAccept, handleSave } = this.props;
    return (
      <React.Fragment>
        {workorders.map((item, key) => (
          <CardNextWorkorder
            key={key}
            workorder={item}
            handleEdit={() => handleEdit(item)}
            handleAccept={handleAccept}
            handleEdit={handleSave}
          />
        ))}
      </React.Fragment>
    );
  }
}
