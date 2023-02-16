import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import { useState } from "react";
import palavras from "./palavras";

let palavraFinal = "";

export default function App() {
  const [numErros, setNumErros] = useState(0);
  const [palavraMostrada, setPalavraMostrada] = useState("");
  const [letrasAtivadas, setLetrasAtivadas] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);

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

  function clicouLetra(letra, index){
    const novasLetras = [...letrasAtivadas];
    novasLetras[index] = 0;
    setLetrasAtivadas(novasLetras);
    if(palavraFinal.split('').includes(letra)){
      atualizaTelaClique(letra, index);
    }else{
      setNumErros(numErros+1);
    }
  }

  function atualizaTelaClique(letra){
    console.log(palavraFinal);
    console.log(palavraMostrada);
    const arrayIndices = [];
    for (let i = 0; i < palavraFinal.length; i++){
      if(palavraFinal[i]===letra){
        arrayIndices.push(i);
      }
    }
    for (let i = 0; i < arrayIndices.length; i++){
      arrayIndices[i] += arrayIndices[i];
    }
    let newPalavraMostrada = palavraMostrada;
    newPalavraMostrada = newPalavraMostrada.split('');
    for(let i = 0; i < palavraMostrada.length; i++){
      if(arrayIndices.includes(i)){
        newPalavraMostrada[i] = letra;
      }
    }
    newPalavraMostrada = newPalavraMostrada.join('');
    setPalavraMostrada(newPalavraMostrada);
  }

  return (
    <div className="App">
      <Jogo
        numErros={numErros}
        palavra={palavraMostrada}
        handleClick={sorteiaPalavra}
      />
      <Letras letrasAtivadas={letrasAtivadas} handleClick={clicouLetra} />
    </div>
  );
}
