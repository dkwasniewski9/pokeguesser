import {useEffect, useState} from 'react'
import '../styles/App.css'
import {getPokemonInfo, getRandomPokemon} from "../services/pokemonService.tsx";
import Pokemon from "../types/Pokemon.tsx";
import Form from "./GuessInput.tsx";
import GuessList from "./GuessList.tsx";
import PokemonWithHints from "../types/PokemonWithHints.tsx";
import {getHint} from "../utils/getHint.tsx";
import Hints from "../types/Hints.tsx";



function App() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [guesses, setGuesses] = useState<PokemonWithHints[]>([])
    useEffect(() => {
        const fetchedPokemon = async (): Promise<void> => {
            try{
                const pokemon = await getRandomPokemon()
                setPokemon(pokemon)
            }catch (err) {
                console.error("Failed fetching pokemon", err)
            }
        }
        fetchedPokemon()
    }, [])

    const handlePokemonCheck = async (input: string) => {
        if (!(pokemon) || input == pokemon.name) {
            return
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
    };
    return (
    <>
      <div>
          <Form sendGuess={handlePokemonCheck} />
          {
              pokemon ? (
                  <div>
                      <table className="pokemon-table">
                          <tbody>
                          <tr>
                              <td style={{ whiteSpace: 'nowrap' }}>
                                  <p><strong>Name:</strong> {pokemon.name}</p>
                                  <p><strong>Height:</strong> {pokemon.height}</p>
                                  <p><strong>Weight:</strong> {pokemon.weight}</p>
                                  <p><strong>Types:</strong> {pokemon.types.join(', ')}</p>
                                  <p><strong>Generation:</strong> {pokemon.generation}</p>
                                  <p><strong>Color:</strong> {pokemon.color}</p>
                              </td>
                              <td style={{ paddingLeft: '10px' }}>
                                  <img src={pokemon.url} alt={pokemon.name} className="pokemonImage" style={{ maxWidth: '200px' }} />
                              </td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
              ) : (
                  <p>Drawing pokemon...</p>
              )
          }
      </div>
        <div><GuessList guesses={guesses} /></div>
    </>
  )
}

export default App
