import React from "react";
import Pokemon from "../types/Pokemon.tsx";
import "../styles/Win.css"

interface WinProps {
    sendRestart: () => void;
    pokemon: Pokemon | null
}

const Win: React.FC<WinProps> = (props: WinProps) => {
    if (props.pokemon) {
        return (
            <div className="win-container">
                <h2 className="win-title">Congratulations! You guessed correctly!</h2>
                <table className="pokemon-table">
                    <tbody>
                    <tr>
                        <td className="pokemon-info">
                            <p><strong>Name:</strong> {props.pokemon.name}</p>
                            <p><strong>Height:</strong> {props.pokemon.height}</p>
                            <p><strong>Weight:</strong> {props.pokemon.weight}</p>
                            <p><strong>Types:</strong> {props.pokemon.types.join(', ')}</p>
                            <p><strong>Generation:</strong> {props.pokemon.generation}</p>
                            <p><strong>Color:</strong> {props.pokemon.color}</p>
                        </td>
                        <td className="pokemon-image">
                            <img src={props.pokemon.url} alt={props.pokemon.name} className="pokemon-image-img"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Win