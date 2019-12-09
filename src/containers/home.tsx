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
import { List } from "immutable";

import "bulma/css/bulma.css";
import "../App.css";
import InputTable from "../components/inputTable";
import vogel from "../utils/vogel";

export default function Home() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [matrix, setMatrix] = useState();

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
                <InputTable handler={setMatrix} rows={rows} columns={columns} />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Button
                  onClick={() => {
                    let input = List();
                    let aval: List<number> = List();
                    let nece: List<number> = List();
                    let count = 0;
                    for (let i = 0; i < rows; i++) {
                      let tmp = [];
                      for (let j = 0; j < columns; j++) {
                        tmp.push(matrix[count++]);
                      }
                      nece = nece.push(matrix[count++]);
                      input = input.push(List(tmp));
                    }
                    for (let j = 0; j < columns; j++) {
                      aval = aval.push(matrix[count++]);
                    }
                    console.log(vogel(input, nece, aval));
                  }}
                >
                  Go
                </Button>
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
