import Pokemon from "../types/Pokemon.tsx";

export const getRandomPokemon = async(): Promise<Pokemon> => {
    const dexNumber = Math.floor(Math.random() * 1025) +1
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`)
        .then((response) => response.json())
    return {
        name: response.name.split('-')[0],
        url: response.sprites.other['official-artwork'].front_default
    }
}