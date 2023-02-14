export default function Jogo(props){
    const imagemForca = `/assets/forca${props.numErros}.png`
    return(
        <div className="Jogo">
            <img src={imagemForca} alt="forca"/>
            <div>
                <button>Escolher palavra</button>
                <p>{props.palavra}</p>
            </div>
        </div>
    )
}