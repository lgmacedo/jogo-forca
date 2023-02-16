import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import { useState } from "react";
import palavras from "./palavras";

let palavraFinal = "";
let newPalavraMostrada = "";

export default function App() {
  const [numErros, setNumErros] = useState(0);
  const [palavraMostrada, setPalavraMostrada] = useState("");
  const [letrasAtivadas, setLetrasAtivadas] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);
  const [corPalavra, setCorPalavra] = useState("");

  function sorteiaPalavra() {
    console.log(palavraFinal);
    if (palavraFinal !== "") {
      return;
    }
    palavraFinal = palavras[Math.floor(Math.random() * palavras.length)];
    atualizaTelaInicial();
    ativaLetras();
  }

  function atualizaTelaInicial() {
    let aExibir = "";
    for (let i = 0; i < palavraFinal.length; i++) {
      aExibir += "_";
    }
    aExibir = aExibir.split("");
    aExibir = aExibir.join(" ");
    setPalavraMostrada(aExibir);
  }

  function ativaLetras() {
    setLetrasAtivadas([
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1,
    ]);
  }

  function clicouLetra(letra, index) {
    const novasLetras = [...letrasAtivadas];
    novasLetras[index] = 0;
    setLetrasAtivadas(novasLetras);
    if (palavraFinal.split("").includes(letra)) {
      atualizaTelaClique(letra, index);
    } else {
      setNumErros(numErros + 1);
      if (numErros === 5) {
        perdeuJogo();
      }
    }
  }

  function atualizaTelaClique(letra) {
    let fix = palavraMostrada.split(" ");
    fix = fix.join("");
    fix = fix.split("");
    fix = fix.join(" ");
    const arrayIndices = [];
    for (let i = 0; i < palavraFinal.length; i++) {
      if (palavraFinal[i] === letra) {
        arrayIndices.push(i);
      }
    }
    for (let i = 0; i < arrayIndices.length; i++) {
      arrayIndices[i] += arrayIndices[i];
    }
    newPalavraMostrada = fix;
    newPalavraMostrada = newPalavraMostrada.split("");
    for (let i = 0; i < fix.length; i++) {
      if (arrayIndices.includes(i)) {
        newPalavraMostrada[i] = letra;
      }
    }
    newPalavraMostrada = newPalavraMostrada.join("");

    newPalavraMostrada = newPalavraMostrada.split(" ");
    for (let i = 0; i < newPalavraMostrada.length; i++) {
      if (newPalavraMostrada[i] === "_" && i !== 0) {
        newPalavraMostrada[i] = " _";
      }
    }
    newPalavraMostrada = newPalavraMostrada.join("");

    setPalavraMostrada(newPalavraMostrada);

    if (newPalavraMostrada === palavraFinal) {
      ganhouJogo();
    }
  }

  function ganhouJogo() {
    setCorPalavra("corPalavraVerde");
    setLetrasAtivadas([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]);
  }

  function perdeuJogo() {
    setPalavraMostrada(palavraFinal);
    setCorPalavra("corPalavraVermelha");
    setLetrasAtivadas([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]);
  }

  return (
    <div className="App">
      <Jogo
        numErros={numErros}
        palavra={palavraMostrada}
        handleClick={sorteiaPalavra}
        corPalavra={corPalavra}
      />
      <Letras letrasAtivadas={letrasAtivadas} handleClick={clicouLetra} />
    </div>
  );
}
