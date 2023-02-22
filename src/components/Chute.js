import { useState } from "react";

export default function Chute({ chuteDesabilitado, handleClick }) {
  const [chute, setChute] = useState("");
  return (
    <div className="Chute">
      <p>Já sei a palavra!</p>
      <input
        data-test="guess-input"
        type="text"
        value={chute}
        onChange={(e) => setChute(e.target.value)}
        disabled={chuteDesabilitado ? true : false}
      />
      <button
        data-test="guess-button"
        className={
          chuteDesabilitado
            ? "backgroundLetraCinza corLetraCinza"
            : "cursorPointer backgroundLetraAzul corLetraAzul"
        }
        disabled={chuteDesabilitado ? true : false}
        onClick={() => {
          handleClick(chute);
          setChute("");
        }}
      >
        Chutar
      </button>
    </div>
  );
}
