export default function Letra(props) {
  let isDisabled = props.desativada;
  return (
    <button
      disabled={isDisabled ? true : false}
      className={
        isDisabled ? "letra backgroundLetraCinza" : "letra backgroundLetraAzul"
      }
      key={props.letra}
      onClick={() => alert("aaaaa")}
    >
      {props.letra.toUpperCase()}
    </button>
  );
}
