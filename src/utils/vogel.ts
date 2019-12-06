import { List } from "immutable";

export default function vogel() {
  let costs = List([
    List([15700, 12800, 17900]),
    List([18500, 11200, 18200]),
    List([21000, 17600, 19300])
  ]);

  let necessity: List<number> = List([46, 20, 19]);
  let availability: List<number> = List([42, 23, 28]);
  //----------------------------

  let diff = difference(necessity, availability);

  if (diff < 0) {
    necessity = necessity.push(Math.abs(diff));
    costs = costs.push(List(Array(availability.size).fill(999999)));
  } else if (diff > 0) {
    availability = availability.push(diff);
    costs = List(costs.map(x => x.push(999999)));
  }

  console.log(solveVogel(costs, necessity, availability).toArray());
}

function difference(necessity: List<number>, availability: List<number>) {
  let n = necessity.reduce((x, y) => x + y, 0);
  let a = availability.reduce((x, y) => x + y, 0);
  return n - a;
}

function penalty(costs: List<List<number>>) {
  let rowPenality: List<number> = List();
  let colPenality: List<number> = List();

  costs.map(x => {
    let tmp = x.sort((a, b) => a - b);
    rowPenality = rowPenality.push(tmp.get(1)! - tmp.get(0)!);
  });

  let minColVal: List<number> = List();

  for (let i = 0; i < costs.get(0)!.size; i++) {
    minColVal = minColVal.clear();
    for (let j = 0; j < costs.size; j++) {
      minColVal = minColVal.push(costs.get(j)!.get(i)!);
    }
    minColVal = minColVal.sort((a, b) => a - b);
    colPenality = colPenality.push(minColVal.get(1)! - minColVal.get(0)!);
  }

  return List([rowPenality, colPenality]);
}

function recurseVogel(
  costs: List<List<number>>,
  necessity: List<number>,
  availability: List<number>,
  result: List<number>
): any {
  if (costs.isEmpty() || costs!.get(0)!.isEmpty()) {
    return result;
  }
  let penalties = penalty(costs);
  let rowGreaterPenaltyIndex = penalties
    .get(0)!
    .indexOf(Math.max(...penalties.get(0)!.toArray()));
  let colGreaterPenaltyIndex = penalties
    .get(1)!
    .indexOf(Math.max(...penalties.get(1)!.toArray()));
  if (
    penalties.get(0)!.get(rowGreaterPenaltyIndex)! >
    penalties.get(1)!.get(colGreaterPenaltyIndex)!
  ) {
    let tmp = List();
    for (let i = 0; i < costs.size; i++) {
      tmp = tmp.push(costs.get(i)!.get(rowGreaterPenaltyIndex));
    }
    let popIndex = rowGreaterPenaltyIndex;
    let posValue = Math.min(...tmp.toArray());
    let need = necessity.get(popIndex)!;
    let avaliable = availability.get(
      costs.get(tmp!.indexOf(posValue))!.indexOf(posValue)
    )!;

    let stockDiff = need - avaliable;
    if (stockDiff < 0) {
      result = result.push(posValue * need);
      availability = availability.set(
        costs.get(tmp!.indexOf(posValue))!.indexOf(posValue),
        Math.abs(stockDiff)
      );
      necessity = necessity.set(popIndex, 0);
    } else if (stockDiff > 0) {
      result = result.push(posValue * avaliable);
      necessity = necessity.set(popIndex, Math.abs(stockDiff));
      availability = availability.set(
        costs.get(tmp!.indexOf(posValue))!.indexOf(posValue),
        0
      );
    } else {
      result = result.push(posValue * need);
      availability = availability.set(
        costs.get(tmp!.indexOf(posValue))!.indexOf(posValue),
        0
      );
      necessity = necessity.set(popIndex, 0);
    }
    necessity = necessity.delete(popIndex);
    costs = costs.delete(popIndex);
  } else {
    let popIndex = costs
      .get(colGreaterPenaltyIndex)!
      .indexOf(Math.min(...costs.get(colGreaterPenaltyIndex)!.toArray()));
    let posValue = Math.min(...costs.get(colGreaterPenaltyIndex)!.toArray());
    let need = necessity.get(costs.get(popIndex)!.indexOf(posValue))!;
    let avaliable = availability.get(popIndex)!;

    let stockDiff = need - avaliable;
    if (stockDiff < 0) {
      result = result.push(posValue * need);
      availability = availability.set(popIndex, Math.abs(stockDiff));
      necessity = necessity.set(costs.get(popIndex)!.indexOf(posValue), 0);
    } else if (stockDiff > 0) {
      result = result.push(posValue * avaliable);
      necessity = necessity.set(
        costs.get(popIndex)!.indexOf(posValue),
        Math.abs(stockDiff)
      );
      availability = availability.set(popIndex, 0);
    } else {
      result = result.push(posValue * need);
      availability = availability.set(popIndex, 0);
      necessity = necessity.set(costs.get(popIndex)!.indexOf(posValue), 0);
    }

    costs = costs.map(x => x.delete(popIndex));
    availability = availability.delete(popIndex);
  }
  return recurseVogel(costs, necessity, availability, result);
}

function solveVogel(
  costs: List<List<number>>,
  necessity: List<number>,
  availability: List<number>
) {
  let result = List();
  return recurseVogel(costs, necessity, availability, result);
}
