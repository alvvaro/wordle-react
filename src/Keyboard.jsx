import Key from "./Key";

const allLetters = ["qwertyuiop", "asdfghjkl", "⏎zxcvbnm⌫"];

const Keyboard = props => {
  return (
    <div className="keyboard">
      {allLetters.map((row, rowIndex) => 
        <div key={rowIndex} className="keyboard-row">
          {[...row].map(letter => 
            <Key key={letter} letter={letter} onKeyPress={props.onKeyPress}/>
          )}
        </div>
      )}
    </div>
  )
}

export default Keyboard;
