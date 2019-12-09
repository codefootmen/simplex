import { List } from "immutable";

export default function vogel 
(
  costs: List<List<number>> = List([]), 
  necessity: List<number> = List(), 
  availability: List<number> = List()
) 
{
  //// Exemplo 1
  
  // costs = List([
  //   List([15700, 12800, 17900]),
  //   List([18500, 11200, 18200]),
  //   List([21000, 17600, 19300])
  // ]);

  // necessity = List([46, 20, 19]);
  // availability = List([42, 23, 28]);


  //// Exemplo 2

  // costs = List([
  //   List([40600, 71400, 32200, 54600]),
  //   List([73500, 66500, 43400, 60900]),
  //   List([53200, 86800, 58100, 38500])
  // ]);

  // necessity = List([415, 660, 440]);
  // availability = List([530, 240, 325, 420]);

  //----------------------------//

  let diff = difference(necessity, availability);
  if (diff < 0) 
  {
    necessity = necessity.push(Math.abs(diff));
    costs = costs.push(List(Array(availability.size).fill(999999)));
  } 
  else if (diff > 0) 
  {
    availability = availability.push(diff);
    costs = List(costs.map(x => x.push(999999)));
  }

  let result: List<number> = List(solveVogel(costs, necessity, availability).toArray());
  if(diff !== 0)
  {
    result = result.delete(result.size - 1);
  }

  console.log(result.reduce((x, y) => x + y, 0));
}


/// Calc the difference between necessity and availability
function difference(necessity: List<number>, availability: List<number>) 
{
  let n = necessity.reduce((x, y) => x + y, 0);
  let a = availability.reduce((x, y) => x + y, 0);
  return n - a;
}

/// Calc the penalty for each row and column
function penalty(costs: List<List<number>>) 
{
  let rowPenality: List<number> = List();
  let colPenality: List<number> = List();

  costs.map(x => {
    let tmp = x.sort((a, b) => a - b);
    rowPenality = rowPenality.push(tmp.get(1)! - tmp.get(0)!);
  });

  let minColVal: List<number> = List();
  for (let i = 0; i < costs.get(0)!.size; i++) 
  {
    minColVal = minColVal.clear();
    for (let j = 0; j < costs.size; j++) 
    {
      minColVal = minColVal.push(costs.get(j)!.get(i)!);
    }

    minColVal = minColVal.sort((a, b) => a - b);
    colPenality = colPenality.push(minColVal.get(1)! - minColVal.get(0)!);
  }

  return List([rowPenality, colPenality]);
}

/// A recursive function to solve the transport method (Vogel)
function recurseVogel
(
  costs: List<List<number>>,
  necessity: List<number>,
  availability: List<number>,
  result: List<number>
): any 
{
  console.log(result);

  if (costs.isEmpty() || costs!.get(0)!.isEmpty()) 
  {
    return result;
  }

  let penalties = penalty(costs);
  let rPenaltyIndex = penalties
    .get(0)!.indexOf(Math.max(...penalties.get(0)!.toArray()));
  let cPenaltyIndex = penalties
    .get(1)!.indexOf(Math.max(...penalties.get(1)!.toArray()));
  let rowPenalty = penalties.get(0)!.get(rPenaltyIndex)!;
  let colPenalty = penalties.get(1)!.get(cPenaltyIndex)!;

  if(colPenalty > rowPenalty) 
  {
    let tmp = List();
    for (let i = 0; i < costs.size; i++) 
    {
      tmp = tmp.push(costs.get(i)!.get(cPenaltyIndex));
    }

    let popIndex = tmp.indexOf(Math.min(...tmp!.toArray()));
    let posValue = tmp.get(popIndex);
    let need = necessity.get(popIndex)!;
    let avaliable = availability.get(popIndex)!;
    let minValue = Math.min(need, avaliable);
      
    result = result.push(posValue * minValue);
    availability = availability.set(cPenaltyIndex, avaliable - minValue);
    necessity = necessity.set(popIndex, need - minValue);
    
    if (avaliable - minValue === 0)
    {
      costs = costs.map(x => x.delete(cPenaltyIndex));
      availability = availability.delete(cPenaltyIndex);
    }

    if (need - minValue === 0)
    {
      costs = costs.delete(popIndex);
      necessity = necessity.delete(popIndex);
    }
  }
  else 
  {
    let popIndex = costs
      .get(rPenaltyIndex)!
      .indexOf(Math.min(...costs.get(rPenaltyIndex)!.toArray()));

    let posValue = Math.min(...costs.get(rPenaltyIndex)!.toArray());
    let need = necessity.get(rPenaltyIndex)!;
    let avaliable = availability.get(popIndex)!;
    let minValue = Math.min(need, avaliable);
      
    result = result.push(posValue * minValue);
    availability = availability.set(popIndex, avaliable - minValue);
    necessity = necessity.set(rPenaltyIndex, need - minValue);
  
    if (avaliable - minValue === 0)
    {
      costs = costs.map(x => x.delete(popIndex));
      availability = availability.delete(popIndex);
    }

    if (need - minValue === 0)
    {
      costs = costs.delete(rPenaltyIndex);
      necessity = necessity.delete(rPenaltyIndex);
    }
  }
  
  return recurseVogel(costs, necessity, availability, result);
}


/// A method to start the recursive solve vogel method
function solveVogel(costs: List<List<number>>, necessity: List<number>, availability: List<number>) 
{
  let result = List();  
  return recurseVogel(costs, necessity, availability, result);
}