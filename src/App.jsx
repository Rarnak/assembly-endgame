import Header from "./components/Header"
import { languages } from "./../languages.js"
import { useState } from "react"
import clsx from "clsx"
import { getFarewellText } from "../util.js"
export default function App() {

  // state variables
  const [currentWord, setCurrentWord] = useState('react')
  const [guess, setGuess] = useState([])

  // derived variables
  const wrongGuessCount = guess.reduce((count, letter) => {
    return (currentWord.includes(letter)) ? count : count + 1
  }, 0)
  const isGameLost = (languages.length - 1 <= wrongGuessCount)
  const isGameWon = currentWord.split("").every((letter) => (guess.includes(letter)))
  const lastGuessLetter = guess[guess.length - 1]
  const isLastGuessIncorrect = lastGuessLetter && !currentWord.includes(lastGuessLetter)
  const isGameOver = isGameLost || isGameWon

  function addGuessLetter(letter) {
    setGuess(prevGuess => {
      return prevGuess.includes(letter) ?
        prevGuess :
        [...prevGuess, letter]
    })
  }

  const alphabets = 'abcdefghijklmnopqrstuvwxyz'

  const KeyboardElements = alphabets.split("").map(letter => {

    const isGuessed = guess.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isIncorrect = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct: isCorrect,
      incorrect: isIncorrect
    })

    return <button
      key={letter}
      className={className}
      disabled={isGameOver}
      aria-disabled={guess.includes(letter)}
      aria-label={`letter ${letter}`}
      onClick={() => { addGuessLetter(letter) }}
    >
      {letter.toUpperCase()}
    </button>
  }
  )

  const letterElements = currentWord.split("").map((letter, index) => {

    return <span
      key={index}
      className="letter">
      {(guess.includes(letter)) ? letter.toUpperCase() : ""}
    </span>
  })

  const languageElements = languages.map((language, index) => {
    const styles = {
      color: language.color,
      backgroundColor: language.backgroundColor
    }

    const className = clsx({
      chip: true,
      lost: (index) < wrongGuessCount
    })
    return <span
      key={index}
      style={styles}
      className={className}
    >
      {language.name}
    </span>
  })

  const gameStatusClass = clsx('game-status',
    isGameLost ? 'lose' : '',
    isGameWon ? 'win' : '',
    isLastGuessIncorrect && !isGameOver ? 'farewell' : '',
  )

  function renderGameStatus() {

    if (!isGameOver && isLastGuessIncorrect) {
      return <p>
        "{getFarewellText(languages[wrongGuessCount - 1].name)}" 🫡
      </p>
    }
    else if (isGameWon) {
      return (<>
        <h2>You Win</h2>
        <p>Well done! 🎉</p>
      </>)
    } else if (isGameLost) {
      return (<>
        <h2>Game Over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </>)
    } else {
      return null
    }
  }

  return (<main>
    <section className="header">
      <Header />
      <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}>
        {renderGameStatus()}
      </section>
    </section>
    <section className="language-chips">
      {languageElements}
    </section>
    <section className="word">
      {letterElements}
    </section>
    <section className="sr-only"
      aria-live="polite"
      role="status"
    >
      <p>Current word :
        {currentWord.split("").map(letter => 
          guess.includes(letter) ? letter + "." : "blank").join(" ")}
      </p>
    </section>
    <section className="keyboard">
      {KeyboardElements}
    </section>
    {isGameOver ? <button className="new-game">New Game</button> : undefined}
  </main>)
}