import {useEffect, useState} from 'react'
import '../styles/App.css'
import {getPokemonInfo, getRandomPokemon} from "../services/pokemonService.tsx";
import Pokemon from "../types/Pokemon.tsx";
import Form from "./GuessInput.tsx";
import GuessList from "./GuessList.tsx";
import PokemonWithHints from "../types/PokemonWithHints.tsx";
import {getHint} from "../utils/getHint.tsx";
import Hints from "../types/Hints.tsx";
import Win from "./Win.tsx";



function App() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [guesses, setGuesses] = useState<PokemonWithHints[]>([])
    const [isGameActive, setGameStatus] = useState<boolean>(true)
    useEffect(() => {
        if(!isGameActive){
            return
        }
        const fetchedPokemon = async (): Promise<void> => {
            try{
                const pokemon = await getRandomPokemon()
                setPokemon(pokemon)
                console.log(pokemon.name)
            }catch (err) {
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
        if(pokemon){
            if (input == pokemon.name) {
                setGameStatus(false)
            }
            const pokemonInfo = await getPokemonInfo(input)
            const hints:Hints = {
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

        {isGameActive ? (
            pokemon ? (
                <div>
                    <Form sendGuess={handlePokemonCheck} />
                    <GuessList guesses={guesses} />
                </div>
            ) : (
                <p>Drawing pokemon...</p>
            )
        ) : (
            <Win sendRestart={handleRestart} pokemon={pokemon} />
        )}
    </>
  )
}

export default App
