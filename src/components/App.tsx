import {useEffect, useState} from 'react'
import '../styles/App.css'
import {getPokemonInfo, getRandomPokemon} from "../services/pokemonService.tsx";
import Pokemon from "../types/Pokemon.tsx";
import Form from "./GuessInput.tsx";
import GuessList from "./GuessList.tsx";



function App() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [guesses, setGuesses] = useState<Pokemon[]>([])
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

    const handlePokemonCheck = async (input) => {
        if (!(pokemon) || input == pokemon.name) {
            return
        }
        const pokemonInfo = await getPokemonInfo(input)
        setGuesses([...guesses, pokemonInfo])
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
