const Key = props => {
  return (
    <button 
      className={
        "keyboard-key " +
        (props.letter === "⏎" || props.letter === "⌫" ? "big-key" : null)}
      value={props.letter}
      onClick={({ target }) => props.onKeyPress(target.value)}
    >{props.letter}</button>
  )
}

export default Key;
