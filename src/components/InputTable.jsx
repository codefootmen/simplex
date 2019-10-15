import React, { Component } from "react";
import { Table, Input, Select } from "bloomer";

class InputTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handler({
      [e.target.getAttribute("cell")]: e.target.value
    });
  }

  render() {
    /*----------*/
    let numberOfVariables = [];
    let numberOfRestrictions = [];

    let id = 0;
    for (let j = 0; j < this.props.columns; j++) {
      numberOfVariables[j] = (
        <td>
          <Input cell={id} type="number" onChange={this.handleChange} /> x
          {j + 1}
        </td>
      );
      id++;
    }

    let firstRow = [...numberOfVariables];

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.columns; j++) {
        numberOfVariables[j] = (
          <td>
            <Input cell={id} type="number" onChange={this.handleChange} /> x
            {j + 1}
          </td>
        );
        id++;
      }

      numberOfRestrictions[i] = (
        <tr>
          <th>R{i + 1}</th>
          {[...numberOfVariables]}
          <td>
            <Select cell={id++} onChange={this.handleChange}>
              <option value="<=">{"<="}</option>
              <option value=">=">{">="}</option>
              <option value="=">{"="}</option>
            </Select>
          </td>
          <td>
            <Input cell={id++} type="number" onChange={this.handleChange} />{" "}
          </td>
        </tr>
      );
    }

    return (
      <Table isBordered isStriped isNarrow>
        <thead>
          <tr>
            <th>Obj. Fn.</th>
            {firstRow}
            <td>=</td>
            <td>Z</td>
          </tr>
        </thead>
        <tbody>{numberOfRestrictions}</tbody>
      </Table>
    );
  }
}
export default InputTable;
