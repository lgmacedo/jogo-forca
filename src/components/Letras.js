export default function Letras({ letrasAtivadas, handleClick }) {
  const alfabeto = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  return (
    <div className="Letras">
      {alfabeto.map((letra, index) => (
        <button
          data-test="letter"
          disabled={letrasAtivadas[index] ? false : true}
          className={
            letrasAtivadas[index]
              ? "letra backgroundLetraAzul"
              : "letra backgroundLetraCinza"
          }
          key={letra}
          onClick={() => handleClick(letra, index)}
        >
          {letra.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
