import React from "react";
import { Table } from "bloomer";
import { List } from "immutable";

export default function VogelResult({ result }: { result: List<number> }) {
  let list = [];
  let count = 0;
  for (let i = 0; i < result.size * 2; i++) {
    if (!(i % 2)) {
      list.push(<td>{result.get(count++)}</td>);
    } else {
      list.push(<td>+</td>);
    }
  }

  list.pop();
  list[list.length - 2] = "=";

  return (
    <Table isBordered isStriped isNarrow>
      <tr>{list}</tr>
    </Table>
  );
}
