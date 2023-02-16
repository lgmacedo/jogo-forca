import Letra from "./Letra";

export default function Letras({desativaTudo}) {
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
      {alfabeto.map((letra) => (
        <Letra
          desativada = {desativaTudo}
          letra={letra}
          key={letra}
        />
      ))}
    </div>
  );
}
