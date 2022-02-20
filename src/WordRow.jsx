import Tile from "./Tile"

const WordRow = props => {
  const renderTile = i => <Tile 
    key={i}
    current={props.cursor === i ? true : false}
    letter={props.word ? props.word[i] : null}
    matches={props.validatedResult?.[i]}
  />;
  
  const numTiles = props.wordLength;

  return (
    <div className="word-row">
      {Array.from({length: numTiles}, (_, i) => renderTile(i))}
    </div>
  )
}

export default WordRow;
