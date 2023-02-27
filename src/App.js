import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import { useState } from "react";
import palavras from "./palavras";
import Chute from "./components/Chute";

let palavraFinal = "";
const numeroTotalLetras = 26;

export default function App() {
  const [numErros, setNumErros] = useState(0);
  const [palavraMostrada, setPalavraMostrada] = useState("");
  const [letrasAtivadas, setLetrasAtivadas] = useState(Array(numeroTotalLetras).fill(0));
  const [corPalavra, setCorPalavra] = useState("");
  const [chuteDesabilitado, setChuteDesabilitado] = useState(true);
  const maxErros = 6;

  function escolherPalavra() {
    setChuteDesabilitado(false);
    if (palavraFinal !== "") {
      palavraFinal = "";
      setNumErros(0);
      setPalavraMostrada("");
      setLetrasAtivadas(Array(numeroTotalLetras).fill(0));
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
    setLetrasAtivadas(Array(numeroTotalLetras).fill(1));
  }

  function clicouLetra(letra, index) {
    const novasLetras = [...letrasAtivadas];
    novasLetras[index] = 0;
    setLetrasAtivadas(novasLetras);
    if (palavraFinal.normalize('NFD').replace(/\p{Diacritic}/gu, "").split("").includes(letra)) {
      atualizaTelaClique(letra);
    } else {
      const novoNumErros = numErros + 1;
      setNumErros(novoNumErros);
      if (novoNumErros === maxErros) {
        perdeuJogo();
      }
    }
  }

  function atualizaTelaClique(letra) {
    const metade = 2;
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
      if (arrayIndices.includes(i)) {
        newPalavraMostrada[i] = palavraFinal[i/metade];
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
    if(chute === ""){
      return;
    }
    if(chute === palavraFinal){
      setPalavraMostrada(palavraFinal);
      ganhouJogo();
    }else{
      setNumErros(maxErros);
      perdeuJogo();
    }
  }

  function ganhouJogo() {
    setCorPalavra("corPalavraVerde");
    setLetrasAtivadas(Array(numeroTotalLetras).fill(0));
    setChuteDesabilitado(true);
  }

  function perdeuJogo() {
    setPalavraMostrada(palavraFinal);
    setCorPalavra("corPalavraVermelha");
    setLetrasAtivadas(Array(numeroTotalLetras).fill(0));
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
