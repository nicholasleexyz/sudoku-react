import "./reset.css";
import "./index.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Cell({ id }) {
  const [val, setVal] = useState(-1);

  function asdf() {
    setVal((a) => (a + 1) % 9);
  }

  return (
    <div className="cell" onClick={asdf}>
      {val < 0 ? "" : val + 1}
    </div>
  );
}

function Board() {
  const a = [...Array(9).keys()];

  return (
    <div className="board">
      {a.map((j) =>
        a.map((i) => {
          return <Cell key={j * 9 + i} id={j * 9 + i} />;
        })
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <div className="content">
        <div className="banner">SUDOKU</div>
        <div className="board-wrapper">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
