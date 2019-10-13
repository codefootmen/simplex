import React, { Component } from "react";
import { Columns, Column, Title, Field, Label, Control, Input } from "bloomer";
import SimplexTable from "../components/SimplexTable";
import InputTable from "../components/InputTable";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: 2,
      rows: 1
    };

    this.getColumns = this.getColumns.bind(this);
    this.getRows = this.getRows.bind(this);
  }
  getRows(e) {
    this.setState({ rows: e.target.value });
  }
  getColumns(e) {
    this.setState({ columns: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Columns>
          <Column isSize={3}>
            <Title>Simplex</Title>
            <Field>
              <Label>Number of variables</Label>
              <Control>
                <Input
                  type="number"
                  value={this.state.columns}
                  onChange={this.getColumns}
                />
              </Control>
            </Field>
            <Field>
              <Label>Number of Restrictions</Label>
              <Control>
                <Input
                  type="number"
                  value={this.state.rows}
                  onChange={this.getRows}
                />
              </Control>
            </Field>
          </Column>
          <Column>
            <div className="App-header">
              <Columns>
                <Column>
                  <InputTable
                    columns={this.state.columns}
                    rows={this.state.rows}
                  />
                </Column>
              </Columns>

              <Columns>
                <Column>
                  <SimplexTable
                    columns={["A", "B", "C", "D", "E"]}
                    rows={["A", "B"]}
                    cells={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  />
                </Column>
              </Columns>
            </div>
          </Column>
        </Columns>
      </div>
    );
  }
}
export default Home;
