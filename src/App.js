import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import { useState } from "react";
import palavras from "./palavras";

let palavraFinal = "";

export default function App() {
  const [numErros, setNumErros] = useState(0);
  const [palavraMostrada, setPalavraMostrada] = useState("");
  const [desativaTudo, setDesativaTudo] = useState(true);

  function sorteiaPalavra(){
    console.log(palavraFinal);
    if(palavraFinal !== ""){
      return;
    }
    palavraFinal = palavras[Math.floor(Math.random()*palavras.length)];
    atualizaTela();
    ativaLetras();
  }

  function atualizaTela(){
    let aExibir = "";
    for(let i=0; i<palavraFinal.length; i++){
      aExibir += "_";
    }
    aExibir = aExibir.split('');
    aExibir = aExibir.join(' ');
    setPalavraMostrada(aExibir);
  }

  function ativaLetras(){
    setDesativaTudo(false);
  }

  return (
    <div className="App">
      <Jogo numErros={numErros} palavra={palavraMostrada} handleClick = {sorteiaPalavra}/>
      <Letras desativaTudo = {desativaTudo}/>
    </div>
  );
}
