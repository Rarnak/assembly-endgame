import Header from "./components/Header"
import { languages } from "./../languages.js"
import { useState } from "react"
import clsx from "clsx"
export default function App() {

  // state variables
  const [currentWord, setCurrentWord] = useState('react')
  const [guess, setGuess] = useState([])

  // derived variables
  const wrongGuessCount = guess.reduce((count, letter) => {
    return (currentWord.includes(letter)) ? count : count + 1
  }, 0)

  // a different approach

  // const wrongGuessCount = guess.filter((letter) => {
  //   return !currentWord.includes(letter)
  // }).length

  // console.log(wrongGuessCount)
  const isGameLost = (languages.length - 1 <= wrongGuessCount)

  const isGameWon = currentWord.split("").every((letter) => (guess.includes(letter)))

  const isGameOver = isGameLost || isGameWon
  // console.log(isGameOver)

  // console.log(guess)

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
      onClick={() => { addGuessLetter(letter) }}
    >
      {letter.toUpperCase()}
    </button>
  }
  )

  const letterElements = currentWord.split("").map((letter, index) => {

    // const isGuessed = guess.includes(letter)

    // const className = clsx({
    //   letter,
    //   reveal: isGuessed
    // })

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
  // const languageElements = languages.map((language) => {
  //   return <LanguageChip
  //     key={language.name}
  //     wrongGuessCount={wrongGuessCount}
  //     {...language}
  //   />
  // })

  // const gameStatus = (isGameWon ?
  //   "You Win" :
  //   isGameLost ?
  //     "Game Over!" :
  //     "")

  // const gameMessage = (isGameWon ?
  //   "Well done! 🎉" :
  //   isGameLost ?
  //     "You lose! Better start learning Assembly 😭" :
  //     ""
  // )

  const gameStatusClass = clsx('game-status',
    isGameLost ? 'lose' : '',
    isGameWon ? 'win' : '')


  function renderGameStatus() {
    if (!isGameOver) {
      return null
    } else if (isGameWon) {
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
      <section className={gameStatusClass}>
        {/* <h2>{gameStatus}</h2>
        <p className="game-message">{gameMessage}</p> */}
        {renderGameStatus()}
      </section>
    </section>
    <section className="language-chips">
      {languageElements}
    </section>
    <section className="word">
      {letterElements}
    </section>
    <section className="keyboard">
      {KeyboardElements}
    </section>
    {isGameOver ? <button className="new-game">New Game</button> : undefined}
  </main>)
}