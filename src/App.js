import React from "react";
import "./App.css";
import { Columns, Column, Title, Field, Label, Control, Input } from "bloomer";
import SimplexTable from "./components/SimplexTable";

function App() {
  return (
    <div className="App">
      <Columns>
        <Column isSize={3}>
          <Title>Simplex</Title>
          <Field>
            <Label>Number of variables</Label>
            <Control>
              <Input type="number" placeholder="2" />
            </Control>
          </Field>
          <Field>
            <Label>Restrictions</Label>
            <Control>
              <Input type="number" placeholder="2" />
            </Control>
          </Field>
        </Column>
        <Column>
          <div className="App-header">
            <SimplexTable
              columns={["A", "B", "C", "D", "E"]}
              rows={["A", "B"]}
              cells={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
          </div>
        </Column>
      </Columns>
    </div>
  );
}

export default App;
