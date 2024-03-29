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
      rows: 1,
      result: [[[0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0]]]
    };

    this.getColumns = this.getColumns.bind(this);
    this.getRows = this.getRows.bind(this);
    this.handler = this.handler.bind(this);
    this.organizeData = this.organizeData.bind(this);
    this.solveSimplex = this.solveSimplex.bind(this);
  }
  componentDidMount() {
    let state = {};
    let i = 0;
    let j = 0;

    for (i; i < this.state.columns; i++) {
      state[i] = 0;
    }

    for (let r = 0; r < this.state.rows; r++) {
      for (j; j < Number(this.state.columns) + 2; j++) {
        state[i + j] = 0;
        if (j === Number(this.state.columns)) {
          state[i + j] = "<=";
        }
      }
    }

    console.log(state);
    this.setState(state);
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

    let output = this.state.simplex.twoSteps(
      this.state.columns,
      restrictions,
      objFn
    );

    this.setState({
      objFn: objFn,
      restrictions: restrictions,
      result: output
    });
  }

  render() {
    let tables = [];
    for (let i = 0; i < this.state.result.length; i++) {
      tables[i] = (
        <SimplexTable
          columns={this.state.result[i][0].map((_, i) => "x" + (i + 1))}
          rows={this.state.result[i].map((_, i) => "R" + (i + 1))}
          cells={this.state.result[i].flat()}
        />
      );
    }
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
                <Column>{tables}</Column>
              </Columns>
            </div>
          </Column>
        </Columns>
      </div>
    );
  }
}
export default Home;
