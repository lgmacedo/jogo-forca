import { useState } from "react";
import forca0 from "../assets/forca0.png";
import forca1 from "../assets/forca1.png";
import forca2 from "../assets/forca2.png";
import forca3 from "../assets/forca3.png";
import forca4 from "../assets/forca4.png";
import forca5 from "../assets/forca5.png";
import forca6 from "../assets/forca6.png";

const imagensForca = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

export default function Jogo({numErros, palavra, handleClick, corPalavra}) {
  return (
    <div className="Jogo">
      <img src={imagensForca[numErros]} alt="forca" />
      <div>
        <button onClick={handleClick}>Escolher palavra</button>
        <p className={corPalavra}>{palavra}</p>
      </div>
    </div>
  );
}
