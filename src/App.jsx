import { useState, useEffect } from "react";

import logo from './logo.svg';
import './App.css';
import "./Board.css";

import Board from "./Board";
import StatusBar from "./StatusBar";
import Keyboard from "./Keyboard";

import { validList, answerList } from "./Lists";
const numTries = 6;
const wordLength = 5;

function App() {
  const [answer, setAnswer] = useState("peace");
  const [guesses, setGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  //const [gameStatus, setGameStatus] = useState("ready"); //ready, running, won, lost
  const [statusMessage, setStatusMessage] = useState("");
  const [cursor, setCursor] = useState([0, 0]);

  const moveCursor = dir => {
    switch(dir) {
      case "return": {
        setCursor(prev => [prev[0] + 1, 0]);
        break;
      }
      case "back": {
        setCursor(prev => [prev[0], prev[1] - 1]);
        break;
      }
      default: {
        setCursor(prev => [prev[0], prev[1] + 1]);
      }

    }
  }

  const changeGuess = action => {
    switch(action.type) {
      case ("addLetter"): {
        if (currentGuess.length < (wordLength - 1)) {
          setCurrentGuess(prev => prev + action.key);
          moveCursor();
        } else if (currentGuess.length === (wordLength - 1) ) {
          setCurrentGuess(prev => prev + action.key);
        }
        break;
      }
      case ("removeLetter"): {
        if (currentGuess.length === wordLength ) {
          setCurrentGuess(prev =>  prev.slice(0, prev.length - 1));
        } else if (currentGuess.length > 0) {
          setCurrentGuess(prev =>  prev.slice(0, prev.length - 1));
          moveCursor("back");
        } 
        break;
      }
      default: return;
    }
  }

  const keyPressHandler = key => {
    switch(key) {
      case "⏎": {
        validateGuess();
        break;
      }
      case "⌫": {
        changeGuess({ type: "removeLetter" });
        break;
      }
      default: {
        changeGuess({ type: "addLetter", key });
      }
    }
  }

  const validateGuess = () => {
    if (currentGuess.length !== wordLength) {
      setStatusMessage("Not enough letters");
    } else if (!validList.includes(currentGuess)) {
      setStatusMessage("\"" + currentGuess + "\" is not a valid word");
    } else {
      let validArray = [];
      [...currentGuess].forEach((letter, index) => {
        const letterOccurrence = [...answer].filter(l => (l === letter)).length;
        if (letter === answer[index]) {
          validArray.push("match");
        } else if (answer.includes(letter)) {
          validArray.push("belong");
        } else {
          validArray.push("miss");
        }
      })
      setResults(prev => [...prev, validArray]);
      if (!validArray.includes("miss") && !validArray.includes("belong")) {
        setStatusMessage("Hurray!");
        setCursor([-1, -1]);
      } else {
        setGuesses(prev => [...prev, currentGuess]);
        moveCursor("return");
        setCurrentGuess("");
      }
    }
  }

  /*
  useEffect(() => {
    setTimeout(() => {
      setStatusMessage("")
    }, 3000); //bug: if two statuses are called in a short span of time, theyre cleared before intended
  }, [statusMessage])
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Board 
          answer={answer}
          guesses={[...guesses, currentGuess]}
          numTries={numTries}
          validList={validList}
          wordLength={wordLength}
          cursor={cursor}
          validatedResult={results}
        />
        <StatusBar 
          message={statusMessage} 
        />
        <Keyboard 
          onKeyPress={keyPressHandler}/>
      </header>
    </div>
  );
}

export default App;
