import React from "react";
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

export default function Home() {
  return (
    <div className="App">
      <Columns>
        <Column isSize={3}>
          <Title>Simplex</Title>
          <Field>
            <Label>Number of variables</Label>
            <Control>
              <Input type="number" />
            </Control>
          </Field>
          <Field>
            <Label>Number of Restrictions</Label>
            <Control>
              <Input type="number" />
            </Control>
          </Field>
        </Column>
        <Column>
          <div className="App-header">
            <Columns>
              <Column>carai</Column>
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
