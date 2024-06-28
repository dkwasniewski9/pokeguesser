import Pokemon from "../types/Pokemon.tsx";
import {romanToNumber} from "../utils/romanToNumber.tsx";


export const getRandomPokemon = async (): Promise<Pokemon> => {
    const dexNumber = Math.floor(Math.random() * 1025)
    const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`)
        .then((response) => response.json())
    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`)
        .then((response) => response.json())
    return {
        dexNumber: responsePokemon.id,
        name: responsePokemon.species.name,
        height: responsePokemon.height,
        weight: responsePokemon.weight,
        url: responsePokemon.sprites.other['official-artwork'].front_default,
        types: responsePokemon.types.map((typeInfo: any) => typeInfo.type.name),
        generation: romanToNumber(responseSpecies.generation.name.split('-')[1]),
        color: responseSpecies.color.name
    }
}
export const getPokemonInfo = async (name: string): Promise<Pokemon> => {
    const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then((response) => response.json())
    return {
        dexNumber: responsePokemon.id,
        name: responsePokemon.species.name,
        height: responsePokemon.height,
        weight: responsePokemon.weight,
        url: responsePokemon.sprites.other['official-artwork'].front_default,
        types: responsePokemon.types.map((typeInfo: any) => typeInfo.type.name),
        generation: romanToNumber(responseSpecies.generation.name.split('-')[1]),
        color: responseSpecies.color.name
    }
}

export const checkPokemonExistence = async (name: string): Promise<boolean> => {
    try {
        const responsePokemon: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return responsePokemon.ok;
    } catch (error) {
        return false;
    }
}