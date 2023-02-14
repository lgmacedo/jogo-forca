import palavras from "./palavras";
import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import { useState } from "react";

export default function App() {
  const [numErros, setNumErros] = useState(0);
  const [palavra, setPalavra] = useState("");
  return (
    <div className="App">
      <Jogo numErros={numErros} palavra={palavra} />
      <Letras />
    </div>
  );
}
