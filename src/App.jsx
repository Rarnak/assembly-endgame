import Header from "./components/Header"
import Status from "./components/Status"
import LanguageChip from "./components/LanguageChip"
import { languages } from "./../languages.js"

export default function App() {
  
  const languageElements = languages.map((language) => {
    return <LanguageChip
      key={language.name}
      {...language}
    />
  })

  return (<main>
    <Header />
    <Status />
    <section className="language-chips">
      {languageElements}
    </section>
  </main>)
}