import React, { useState } from "react";
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

import "bulma/css/bulma.css";
import "../App.css";
import InputTable from "../components/inputTable";
import vogel from "../utils/vogel";

export default function Home() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);

  console.log(vogel());

  return (
    <div className="App">
      <Columns>
        <Column isSize={3}>
          <Title>Vogel</Title>
          <Field>
            <Label>Target</Label>
            <Control>
              <Input
                value={columns}
                onChange={(e: any) => {
                  setColumns(Number(e.target.value));
                }}
                type="number"
              />
            </Control>
          </Field>
          <Field>
            <Label>Origin</Label>
            <Control>
              <Input
                value={rows}
                onChange={(e: any) => {
                  setRows(Number(e.target.value));
                }}
                type="number"
              />
            </Control>
          </Field>
        </Column>
        <Column>
          <div className="App-header">
            <Columns>
              <Column>
                <InputTable rows={rows} columns={columns} />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Button>Go</Button>
              </Column>
            </Columns>
            <Columns>
              <Column>Meh</Column>
            </Columns>
          </div>
        </Column>
      </Columns>
    </div>
  );
}
