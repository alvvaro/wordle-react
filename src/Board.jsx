import WordRow from "./WordRow";

const Board = props => {
  const numRows = props.numTries;

  const renderRow = i =>
    <WordRow 
      key={i}
      wordLength={props.wordLength}
      cursor={props.cursor[0] === i ? props.cursor[1] : null}
      word={props.guesses?.[i]}
      validatedResult={props.validatedResult?.[i]}
    />;



  return (
    <div className="board">
      {Array.from({length: numRows}, (_, i) => renderRow(i))}
    </div>
  )
}

export default Board;
