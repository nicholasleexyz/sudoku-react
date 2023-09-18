import "./reset.css";
import "./index.css";

// eslint-disable-next-line react/prop-types
function Cell({ id }) {
  return <div className="cell">{id}</div>;
}

function Board() {
  const a = [...Array(9).keys()];

  return (
    <div className="board">
      {a.map((j) =>
        a.map((i) => {
          return <Cell key={`${i}-${j}`} id={j * 9 + i} />;
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
