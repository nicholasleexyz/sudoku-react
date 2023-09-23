import { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import { cellsContext } from "./Contexts";
// import cellsContext from "./Contexts";

export function Board() {
  const [solvedRows, setSolvedRows] = useState(Array(9).fill(false));
  const [solvedColumns, setSolvedColumns] = useState(Array(9).fill(false));

  const [solvedBlocks, setSolvedBlocks] = useState(Array(9).fill(false));

  const [cells, setCells] = useContext(cellsContext);

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

    /*
      block rows - 9 of them (000 111 222)
      board rows - 9 of them (012 345 678)

      (000 111 222) * 9 = (000 999 181818)
      board row * 3

      boardRows = 0..9.map(r => r * 3) // 
      blockRows = 0..9.map(r => (r % 3) * 18)

      val = 0..9.map(r => (r * 3) + ((r % 3) * 18)) // prolly this

      cell = blockRow * 18 + boardRow * 3

     */

    const a = [...Array(9).keys()].map((i) => i % 3); // 0 1 2 0 1 2 0 1 2
    const b = [...Array(9).keys()].map((i) => (i % 3) * 9); // 0 9 18 0 9 18 0 9 18
    // const z = [...Array(9).keys()].map((i) => Math.floor(i / 3) * 9 + (i % 3));
    const v = [...Array(9).keys()].map((i) => Math.floor(i / 3)); // 000 111 222
    const z = [...Array(9).keys()].map((i) =>
      // [...Array(9).keys()].map((j) => Math.floor(j / 3))
      // [...Array(9).keys()].map((j) => Math.floor(i / 3) * 18)
      // [...Array(9).keys()].map((j) => Math.floor(j / 3) * 9)
      // [...Array(9).keys()].map((j) => j % 3)
      [...Array(9).keys()].map(
        (j) => Math.floor(j / 3) * 9 + (j % 3) + i * 3 + Math.floor(i / 3) * 18
      )
    );
    console.log(z);
    // const b = Array(9).fill(false);
    // for (let i = 0; i < blocks.length; i++) {
    //   const block = blocks[i];
    //   if ([...new Set(block.filter((n) => n >= 0))].length == 9) {
    //     b[i] = true;
    //     // console.log("solved row: " + i);
    //   }
    // }
    // setSolvedBlocks(b);

    // console.log(rows);
  }, [cells]);

  // useEffect(() => {
  //   console.log(solvedRows);
  // }, [solvedRows]);

  return (
    <div className="board">
      {[...Array(9).keys()].map((j) =>
        [...Array(9).keys()].map((i) => {
          return (
            <Cell
              key={j * 9 + i}
              index={j * 9 + i}
              solved={solvedRows[j] || solvedColumns[i]}
            />
          );
        })
      )}
    </div>
  );
}
