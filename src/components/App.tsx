import {useEffect, useState} from 'react'
import {getPokemonInfo, getRandomPokemon} from "../services/pokemonService.tsx";
import Pokemon from "../types/Pokemon.tsx";
import Form from "./GuessInput.tsx";
import GuessList from "./GuessList.tsx";
import PokemonWithHints from "../types/PokemonWithHints.tsx";
import {getHint} from "../utils/getHint.tsx";
import Hints from "../types/Hints.tsx";
import Win from "./Win.tsx";
import '../styles/App.css';
import React from 'react';


function App() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [guesses, setGuesses] = useState<PokemonWithHints[]>([])
    const [isGameActive, setGameStatus] = useState<boolean>(true)
    useEffect(() => {
        if (!isGameActive) {
            return
        }
        const fetchedPokemon = async (): Promise<void> => {
            try {
                const pokemon = await getRandomPokemon()
                setPokemon(pokemon)
                console.log(pokemon.name)
            } catch (err) {
                console.error("Failed fetching pokemon", err)
            }
        }
        fetchedPokemon()
    }, [isGameActive])


    const handleRestart = () => {
        setPokemon(null)
        setGuesses([])
        setGameStatus(true)
    }
    const handlePokemonCheck = async (input: string) => {
        if (pokemon) {
            if(guesses.find(pokemonWithHints => pokemonWithHints.pokemon.name === input)){
                return
            }
            if (input == pokemon.name) {
                setGameStatus(false)
            }
            const pokemonInfo:Pokemon = await getPokemonInfo(input)
            const hints: Hints = {
                dexNumber: '',
                name: '',
                height: '',
                weight: '',
                types: '',
                generation: '',
                color: ''
            }
            for (const key in pokemonInfo) {
                const typedKey = key as keyof Hints;
                if (typedKey in hints) {
                    hints[typedKey] = getHint(pokemonInfo[typedKey], pokemon[typedKey]);
                }
            }
            setGuesses([...guesses, {pokemon: pokemonInfo, hints: hints}])
        }

    };
    return (
        <>
            <div className="container">
                {isGameActive ? (
                    pokemon ? (
                        <div>
                            <Form sendGuess={handlePokemonCheck}/>
                            <GuessList guesses={guesses}/>
                        </div>
                    ) : (
                        <p className="loading-message">Drawing pokemon...</p>
                    )
                ) : (
                    <Win sendRestart={handleRestart} pokemon={pokemon}/>
                )}
                {!isGameActive && (
                    <button className="restart-button" onClick={handleRestart}>
                        Restart Game
                    </button>
                )}
            </div>
        </>
    )
}

export default App
