import React from "react";
import '../styles/GuessList.css'
import PokemonWithHints from "../types/PokemonWithHints.tsx";

interface GuessListProps {
    guesses: PokemonWithHints[];
}


const GuessList: React.FC<GuessListProps> = (props: GuessListProps) => {
    return (
        <div className="guess-list-container">
            <h2>Guessed Pokemon:</h2>
            <table className="guess-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Types</th>
                    <th>Generation</th>
                    <th>Color</th>
                </tr>
                </thead>
                <tbody>
                {props.guesses.length > 0 ? (
                    props.guesses.slice().reverse().map((guess, index) => (
                        <tr key={index}>
                            <td data-label="Dex Number" className={guess.hints.dexNumber}>
                                {guess.pokemon.dexNumber}
                                {guess.hints.dexNumber === 'lower' ? (<p className="extra-text">(Lower)</p>) : ('')}
                                {guess.hints.dexNumber === 'higher' ? (<p className="extra-text">(Higher)</p>) : ('')}
                            </td>
                            <td data-label="Image" className={guess.hints.name}>
                                <img src={guess.pokemon.url} alt={guess.pokemon.name} style={{maxWidth: '100px'}}/>
                            </td>
                            <td data-label="Name" className={guess.hints.name}>{guess.pokemon.name}</td>
                            <td data-label="Height" className={guess.hints.height}>
                                {guess.pokemon.height}
                                {guess.hints.height === 'lower' ? (<p className="extra-text">(Lower)</p>) : ('')}
                                {guess.hints.height === 'higher' ? (<p className="extra-text">(Higher)</p>) : ('')}
                            </td>
                            <td data-label="Weight" className={guess.hints.weight}>
                                {guess.pokemon.weight}
                                {guess.hints.weight === 'lower' ? (<p className="extra-text">(Lower)</p>) : ('')}
                                {guess.hints.weight === 'higher' ? (<p className="extra-text">(Higher)</p>) : ('')}
                            </td>
                            <td data-label="Types" className={guess.hints.types}>{guess.pokemon.types.join(', ')}</td>
                            <td data-label="Generation" className={guess.hints.generation}>
                                {guess.pokemon.generation}
                                {guess.hints.generation === 'lower' ? (<p className="extra-text">(Lower)</p>) : ('')}
                                {guess.hints.generation === 'higher' ? (<p className="extra-text">(Higher)</p>) : ('')}
                            </td>
                            <td data-label="Color" className={guess.hints.color}>{guess.pokemon.color}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8}><p className={'no-guess'}>No guessed pokemon</p></td>
                    </tr>
                )
                }
                </tbody>
            </table>
        </div>
    );
}

export default GuessList