import React from "react";
import Pokemon from "../types/Pokemon.tsx";

interface GuessListProps {
    guesses: Pokemon[];
}


const GuessList: React.FC<GuessListProps> = (props: GuessListProps) => {
    return (
        <div>
            <h2>Guessed Pokemon:</h2>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Types</th>
                    <th>Generation</th>
                    <th>Color</th>
                    <th>Image</th>
                </tr>
                </thead>
                <tbody>
                {props.guesses.length > 0 ? (
                        props.guesses.map((pokemon, index) => (
                            <tr key={index}>
                                <td>{pokemon.dexNumber}</td>
                                <td><img src={pokemon.url} alt={pokemon.name} style={{ maxWidth: '100px' }} /></td>
                                <td>{pokemon.name}</td>
                                <td>{pokemon.height}</td>
                                <td>{pokemon.weight}</td>
                                <td>{pokemon.types.join(', ')}</td>
                                <td>{pokemon.generation}</td>
                                <td>{pokemon.color}</td>
                            </tr>
                        ))
                    ) : (
                    <tr>
                        <td colSpan={8}><p>Guess Pokemon</p></td>
                    </tr>
                )
                }
                </tbody>
            </table>
        </div>
    );
}

export default GuessList