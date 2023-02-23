import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import { useState } from "react";
import palavras from "./palavras";
import Chute from "./components/Chute";

let palavraFinal = "";

export default function App() {
  const [numErros, setNumErros] = useState(0);
  const [palavraMostrada, setPalavraMostrada] = useState("");
  const [letrasAtivadas, setLetrasAtivadas] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);
  const [corPalavra, setCorPalavra] = useState("");
  const [chuteDesabilitado, setChuteDesabilitado] = useState(true);

  function escolherPalavra() {
    setChuteDesabilitado(false);
    if (palavraFinal !== "") {
      palavraFinal = "";
      setNumErros(0);
      setPalavraMostrada("");
      setLetrasAtivadas([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ]);
      setCorPalavra("");
    }
    palavraFinal = palavras[Math.floor(Math.random() * palavras.length)];
    atualizaTelaInicial();
    ativaLetras();
    console.log(palavraFinal);
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
    if (palavraFinal.normalize('NFD').replace(/\p{Diacritic}/gu, "").split("").includes(letra)) {
      atualizaTelaClique(letra, index);
    } else {
      let novoNumErros = numErros + 1;
      setNumErros(novoNumErros);
      if (novoNumErros === 6) {
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
      if (palavraFinal.normalize('NFD').replace(/\p{Diacritic}/gu, "")[i] === letra) {
        arrayIndices.push(i);
      }
    }
    for (let i = 0; i < arrayIndices.length; i++) {
      arrayIndices[i] += arrayIndices[i];
    }
    let newPalavraMostrada = fix;
    newPalavraMostrada = newPalavraMostrada.split("");
    for (let i = 0; i < fix.length; i++) {
      console.log(newPalavraMostrada);
      console.log(palavraFinal);
      if (arrayIndices.includes(i)) {
        newPalavraMostrada[i] = palavraFinal[i/2];
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

  function chutouPalavra(chute) {
    if(chute === "")
      return;
    if(chute === palavraFinal){
      setPalavraMostrada(palavraFinal);
      ganhouJogo();
    }else{
      setNumErros(6);
      perdeuJogo();
    }
  }

  function ganhouJogo() {
    setCorPalavra("corPalavraVerde");
    setLetrasAtivadas([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]);
    setChuteDesabilitado(true);
  }

  function perdeuJogo() {
    setPalavraMostrada(palavraFinal);
    setCorPalavra("corPalavraVermelha");
    setLetrasAtivadas([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]);
    setChuteDesabilitado(true);
  }

  return (
    <div className="App">
      <Jogo
        numErros={numErros}
        palavra={palavraMostrada}
        handleClick={escolherPalavra}
        corPalavra={corPalavra}
      />
      <Letras letrasAtivadas={letrasAtivadas} handleClick={clicouLetra} />
      <Chute
        chuteDesabilitado={chuteDesabilitado}
        handleClick={chutouPalavra}
      />
    </div>
  );
}
