import React from "react";
import { Table, Input, Select } from "bloomer";

export default function InputTable({
  rows,
  columns,
  handler
}: {
  rows: number;
  columns: number;
  handler: Function;
}) {
  let r = [];
  let c = [];
  let count = 0;

  r[0] = (
    <tr>
      <th></th>
      {new Array(columns).fill(0).map((x, i) => (
        <th>{"T" + (i + 1)}</th>
      ))}
      <th>Necessity</th>
    </tr>
  );

  for (let i = 0; i < rows + 1; i++) {
    for (let j = 0; j < columns; j++) {
      c[j] = (
        <td>
          <Input
            onChange={(e: any) => {
              let id = e.target.id;
              let value = e.target.value;
              handler((prevState: any) => {
                return { ...prevState, [id]: value };
              });
            }}
            type="number"
            placeholder="0"
            id={String(count++)}
          />
        </td>
      );
    }
    r[i + 1] = (
      <tr>
        {[
          <th>{"O" + (i + 1)}</th>,
          ...c,
          <td>
            <Input
              onChange={(e: any) => {
                let id = e.target.id;
                let value = e.target.value;
                handler((prevState: any) => {
                  return { ...prevState, [id]: value };
                });
              }}
              type="number"
              id={String(count++)}
            />
          </td>
        ]}
      </tr>
    );
    r[rows + 1] = <tr>{[<th>Availability</th>, ...c]}</tr>;
    c = [];
  }

  return (
    <Table isBordered isStriped isNarrow>
      <thead>{/*  */}</thead>
      <tbody>{r}</tbody>
    </Table>
  );
}
