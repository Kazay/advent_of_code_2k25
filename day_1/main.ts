import { input } from "./input.ts";

type List = Array<number>;
type Lists = [List, List];
type OccurenceObj = Record<number, number>;

const [left, right] = generateLists(input);

left.sort();
right.sort();

distanceScore(left, right);
similarityScore(left, right);

function distanceScore(left: List, right: List): void {
  const score = left.reduce(
    (acc: number, val: number, i: number): number =>
      acc + Math.abs(val - right[i]),
    0
  );

  console.log(`Distance score : ${score}`);
}

function similarityScore(left: List, right: List): void {
  let rightOccurences = generateOccurenceObject(right);

  const score = left.reduce((acc, val) => {
    if (typeof rightOccurences[val] === "undefined") return acc;
    return acc + val * rightOccurences[val];
  }, 0);

  console.log(`Similarity score : ${score}`);
}

function generateLists(text: string): Lists {
  const lines = input.split("\n");

  return lines.reduce(
    (acc: Lists, str: string, i: number): Lists => {
      const [first, second] = str.split(/\s+/);

      acc[0][i] = parseInt(first);
      acc[1][i] = parseInt(second);

      return acc;
    },
    [[], []]
  );
}

function generateOccurenceObject(list: List): OccurenceObj {
  let obj = list.reduce((acc: OccurenceObj, val: number): OccurenceObj => {
    acc[val] ? acc[val]++ : (acc[val] = 1);
    return acc;
  }, {});

  return obj;
}
