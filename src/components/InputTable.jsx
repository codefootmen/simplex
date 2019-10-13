import React, { Component } from "react";
import { Table, Input, Select } from "bloomer";

class InputTable extends Component {
  render() {
    let numberOfVariables = [];

    for (let i = 0; i < this.props.columns; i++) {
      numberOfVariables[i] = (
        <td>
          <Input key={i} type="number" /> x{i + 1}
        </td>
      );
    }

    let numberOfRestrictions = [];

    for (let i = 0; i < this.props.rows; i++) {
      numberOfRestrictions[i] = (
        <tr>
          <th>R{i + 1}</th>
          {numberOfVariables}
          <td>
            <Select>
              <option>{"<="}</option>
              <option value="">{">="}</option>
              <option value="">{"="}</option>
            </Select>
          </td>

          <td>
            <Input type="number" /> B
          </td>
        </tr>
      );
    }

    return (
      <Table isBordered isStriped isNarrow>
        <thead>
          <tr>
            <th>Obj. Fn.</th>
            {numberOfVariables}
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
