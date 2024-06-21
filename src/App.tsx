import {useEffect, useState} from 'react'
import './styles/App.css'
import {getRandomPokemon} from "./services/pokemonService.tsx";
import Pokemon from "./types/Pokemon.tsx";



function App() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    useEffect(() => {
        const fetchedPokemon = async (): Promise<void> => {
            try{
                const pokemon = await getRandomPokemon()
                setPokemon(pokemon)
            }catch (err) {
                console.error("Failed fetching pokemon", err)
            }
            console.log('losowanko')
        }
        fetchedPokemon()
    }, [])

  return (
    <>
      <div>
          {
              pokemon ? (
                  <div>
                      <p>Name: {pokemon.name}</p>
                      <img src={pokemon.url} className="pokemonImage"/>
                  </div>
              ) : (
                  <p>Drawing pokemon...</p>
              )
          }
      </div>
    </>
  )
}

export default App
