import React from "react";
import { Table } from "bloomer";

export default function VogelResult({
  result,
  final
}: {
  result: number[][][];
  final: number;
}) {
  let list = [];
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      list.push(
        <>
          <td>
            {result[i][j][0] + "\u{000BB}"}

            {"O" +
              (result[i][j][1] + 1) +
              "\u{02192}" +
              "T" +
              (result[i][j][2] + 1)}
          </td>
        </>
      );
    }
  }

  return (
    <Table isBordered isStriped isNarrow>
      <tr>
        {list} <td>={final}</td>
      </tr>
    </Table>
  );
}
