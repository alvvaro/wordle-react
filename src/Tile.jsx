const Tile = props => {
  return (
    <div className={
      "tile " +
      (props.current ? "current-tile" : null) + " " +
      (props.matches ? props.matches : null)}>
      {props.letter}
    </div>
  )
}

export default Tile;
