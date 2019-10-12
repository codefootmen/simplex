import React, { Component } from "react";
import { Table } from "bloomer";

class simplexTable extends Component {
  render() {
    let pace = this.props.cells.length / this.props.rows.length;

    return (
      <Table isBordered isStriped isNarrow>
        <thead>
          <tr>
            <th></th>
            {this.props.columns.map(x => (
              <th>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map((x, i) => {
            let current = i;
            i = i + 1;
            i = i * pace;
            let print = [];
            for (let z = current * pace; z < i; z++) {
              print.push(this.props.cells[z]);
            }
            return (
              <tr>
                <th>{x}</th>
                {print.map(x => (
                  <td>{x}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default simplexTable;
