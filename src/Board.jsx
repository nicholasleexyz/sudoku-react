import { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import { cellsContext } from "./Contexts";
// import cellsContext from "./Contexts";

export function Board() {
  const [solvedRows, setSolvedRows] = useState(Array(9).fill(false));
  const [solvedColumns, setSolvedColumns] = useState(Array(9).fill(false));
  const [solvedBlocks, setSolvedBlocks] = useState(Array(9).fill(false));
  const [cells, setCells] = useContext(cellsContext);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const a = async () =>
      await fetch("./puzzles.json")
        .then((res) => res.json())
        .then((json) => {
          const p = json[Object.keys(json)[counter]].flat().map((n) => n - 1);
          setCells(p);
        });

    a();
  }, [setCells, counter]);

  useEffect(() => {
    const rows = [...Array(9).keys()]
      .map((i) => i * 9)
      .map((j) => [...Array(9).keys()].map((k) => cells[k + j]));

    const r = Array(9).fill(false);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if ([...new Set(row.filter((n) => n >= 0))].length == 9) {
        r[i] = true;
        // console.log("solved row: " + i);
      }
    }
    setSolvedRows(r);

    const columns = [...Array(9).keys()].map((j) =>
      [...Array(9).keys()].map((i) => cells[i * 9 + j])
    );
    // console.log(columns);
    const c = Array(9).fill(false);
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if ([...new Set(column.filter((n) => n >= 0))].length == 9) {
        c[i] = true;
        // console.log("solved row: " + i);
      }
    }
    setSolvedColumns(c);

    const blocks = [...Array(9).keys()].map((i) =>
      [...Array(9).keys()].map(
        (j) =>
          cells[
            Math.floor(j / 3) * 9 + (j % 3) + i * 3 + Math.floor(i / 3) * 18
          ]
      )
    );

    const b = Array(9).fill(false);
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if ([...new Set(block.filter((n) => n >= 0))].length == 9) {
        b[i] = true;
        // console.log("solved cell block: " + i);
      }
    }
    setSolvedBlocks(b);
  }, [cells]);

  useEffect(() => {
    const blocksSolved = solvedBlocks.reduce((a, b) => a && b);
    const columnsSolved = solvedColumns.reduce((a, b) => a && b);
    const rowsSolved = solvedRows.reduce((a, b) => a && b);

    if (blocksSolved && columnsSolved && rowsSolved) {
      console.log("You Solved the Puzzle!");
    }
  }, [solvedBlocks, solvedColumns, solvedRows]);

  return (
    <>
      <button onClick={() => setCounter((a) => (a + 1) % 5)}>asfd</button>
      <div className="board">
        {[...Array(9).keys()].map((j) =>
          [...Array(9).keys()].map((i) => {
            return (
              <Cell
                key={j * 9 + i}
                index={j * 9 + i}
                solved={
                  solvedRows[j] ||
                  solvedColumns[i] ||
                  solvedBlocks[Math.floor(i / 3) + Math.floor(j / 3) * 3]
                }
              />
            );
          })
        )}
      </div>
    </>
  );
}
