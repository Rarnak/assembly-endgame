import Header from "./components/Header"
import Status from "./components/Status"
import LanguageChip from "./components/LanguageChip"
import { languages } from "./../languages.js"
import { useState } from "react"

export default function App() {
  const [currentWord, setCurrentWord] = useState('react')

  const alphabets = 'abcdefghijklmnopqrstuvwxyz'

  const KeyboardElements = alphabets.split("").map(letter => {
    return <button
      key={letter}
      className="keyboard-letter"
    >
      {letter.toUpperCase()}
    </button>
  })

  const letterElements = currentWord.split("").map((letter, index) => {
    return <span
      key={index}
      className="letter">
      {letter.toUpperCase()}
    </span>
  })

  const languageElements = languages.map((language) => {
    return <LanguageChip
      key={language.name}
      {...language}
    />
  })

  return (<main>
    <section className="header">
      <Header />
      <Status />
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
    <button className="new-game">New Game</button>
  </main>)
}