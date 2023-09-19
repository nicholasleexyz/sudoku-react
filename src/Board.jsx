import { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import { cellsContext } from "./Contexts";
// import cellsContext from "./Contexts";

export function Board() {
  const [solvedRows, setSolvedRows] = useState(Array(9).fill(false));
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
    // console.log(rows);
  }, [cells]);

  useEffect(() => {
    console.log(solvedRows);
  }, [solvedRows]);

  return (
    <div className="board">
      {[...Array(9).keys()].map((j) =>
        [...Array(9).keys()].map((i) => {
          return (
            <Cell key={j * 9 + i} index={j * 9 + i} solved={solvedRows[j]} />
          );
        })
      )}
    </div>
  );
}
