import React from "react";
import Pokemon from "../types/Pokemon.tsx";
interface WinProps {
    sendRestart: () => void;
    pokemon: Pokemon | null
}
const Win: React.FC<WinProps> = (props: WinProps) => {
    if(props.pokemon) {
        return (
            <div>
                <h2>Congratulations! You guessed correctly!</h2>
                <table className="pokemon-table">
                    <tbody>
                    <tr>
                        <td style={{whiteSpace: 'nowrap'}}>
                            <p><strong>Name:</strong> {props.pokemon.name}</p>
                            <p><strong>Height:</strong> {props.pokemon.height}</p>
                            <p><strong>Weight:</strong> {props.pokemon.weight}</p>
                            <p><strong>Types:</strong> {props.pokemon.types.join(', ')}</p>
                            <p><strong>Generation:</strong> {props.pokemon.generation}</p>
                            <p><strong>Color:</strong> {props.pokemon.color}</p>
                        </td>
                        <td style={{paddingLeft: '10px'}}>
                            <img src={props.pokemon.url} alt={props.pokemon.name} className="pokemonImage"
                                 style={{maxWidth: '200px'}}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={props.sendRestart}>Restart Game</button>
            </div>
        );
    }
}

export default Win