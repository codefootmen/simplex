import React, { Component } from "react";
import {
  Button,
  Columns,
  Column,
  Title,
  Field,
  Label,
  Control,
  Input
} from "bloomer";
import SimplexTable from "../components/SimplexTable";
import InputTable from "../components/InputTable";
import Simplex from "../Utils/Simplex";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      simplex: new Simplex(),
      columns: 2,
      rows: 1
    };

    this.getColumns = this.getColumns.bind(this);
    this.getRows = this.getRows.bind(this);
    this.handler = this.handler.bind(this);
    this.organizeData = this.organizeData.bind(this);
    this.solveSimplex = this.solveSimplex.bind(this);
  }

  handler(state) {
    this.setState(state);
  }

  getRows(e) {
    this.setState({ rows: e.target.value });
  }

  getColumns(e) {
    this.setState({ columns: e.target.value });
  }

  solveSimplex() {
    this.organizeData();
    if(this.state.restrictions !== undefined && this.state.objFn !== undefined){
        let output = this.state.simplex.twoSteps(this.state.columns, this.state.restrictions, this.state.objFn);
        console.log(output);
    }
  }

  organizeData() {
    let objFn = [];

    for (let i = 0; i < this.state.columns; i++) {
      objFn.push(this.state[i]);
    }
    objFn.push("0");

    let restrictions = [];
    let cont = this.state.columns;

    for (let j = 0; j < this.state.rows; j++) {
      restrictions[j] = [];
      for (let z = 0; z < parseInt(this.state.columns) + 2; z++) {
        restrictions[j].push(this.state[cont]);
        cont++;
      }
    }

    this.setState({
        objFn: objFn,
        restrictions: restrictions
    });
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
                    handler={this.handler}
                  />
                </Column>
              </Columns>
              <Columns>
                <Column>
                  <Button onClick={this.solveSimplex}>Go</Button>
                </Column>
              </Columns>
              <Columns>
                <Column>
                  <SimplexTable
                    columns={["x1", "x2", "x3", "x4", "b"]}
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
