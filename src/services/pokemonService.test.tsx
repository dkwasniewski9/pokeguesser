import Pokemon from "../types/Pokemon.tsx";
import * as utils from "../utils/romanToNumber.tsx";
import {checkPokemonExistence, getPokemonInfo, getRandomPokemon} from "./pokemonService.tsx";

describe('pokemonService', () => {
    describe('getRandomPokemon', () => {
        it('should return random pokemon', async () => {
            //Given
            const mockResponsePokemon = {
                id: 133,
                species:{
                    name: 'eevee'
                },
                height: 3,
                weight: 65,
                types: [
                    {
                        "slot": 1,
                        "type": {
                            "name": "normal",
                            "url": "https://pokeapi.co/api/v2/type/1/"
                        }
                    }
                ],
                sprites: {
                    other: {
                        'official-artwork': {
                            front_default: "https://example.com/eevee.png"
                        }
                    }
                }
            }
            const mockResponseSpecies = {
                color: {
                    name: 'brown'
                },
                generation: {
                    name: 'generation-i'
                }
            }
            global.fetch = jest.fn().mockResolvedValueOnce({
                json: async () => mockResponsePokemon
            } as Response).mockResolvedValueOnce({
                json: async () => mockResponseSpecies
            } as Response)
            jest.spyOn(Math, 'random').mockImplementation(() => {
                return 133 / 1025
            })
            jest.spyOn(utils, 'romanToNumber').mockImplementation(() => {
                return 1
            })

            //When
            const result:Pokemon = await getRandomPokemon()

            //Then
            expect(result.dexNumber).toBe(133);
            expect(result.name).toBe("eevee");
            expect(result.height).toBe(3);
            expect(result.weight).toBe(65);
            expect(result.url).toBe("https://example.com/eevee.png");
            expect(result.types).toEqual(["normal"]);
            expect(result.generation).toBe(1);
            expect(result.color).toBe("brown");
        })
    })
    describe('getPokemonInfo', () => {
        it('should return pokemon info', async () => {
            //Given
            const mockResponsePokemon = {
                id: 133,
                species:{
                    name: 'eevee'
                },
                height: 3,
                weight: 65,
                types: [
                    {
                        "slot": 1,
                        "type": {
                            "name": "normal",
                            "url": "https://pokeapi.co/api/v2/type/1/"
                        }
                    }
                ],
                sprites: {
                    other: {
                        'official-artwork': {
                            front_default: "https://example.com/eevee.png"
                        }
                    }
                }
            }
            const mockResponseSpecies = {
                color: {
                    name: 'brown'
                },
                generation: {
                    name: 'generation-i'
                }
            }
            global.fetch = jest.fn().mockResolvedValueOnce({
                json: async () => mockResponsePokemon
            } as Response).mockResolvedValueOnce({
                json: async () => mockResponseSpecies
            } as Response)
            jest.spyOn(utils, 'romanToNumber').mockImplementation(() => {
                return 1
            })

            //When
            const result:Pokemon = await getPokemonInfo('133')

            //Then
            expect(result.dexNumber).toBe(133);
            expect(result.name).toBe("eevee");
            expect(result.height).toBe(3);
            expect(result.weight).toBe(65);
            expect(result.url).toBe("https://example.com/eevee.png");
            expect(result.types).toEqual(["normal"]);
            expect(result.generation).toBe(1);
            expect(result.color).toBe("brown");
        })
    })
    describe('checkPokemonExistance', () => {
        it('should return true if pokemon exists', async () => {
            //Given
            const pokemonName: string = 'eevee'
            global.fetch = jest.fn().mockResolvedValueOnce({
                ok: true
            } as Response)

            //When
            const result = await checkPokemonExistence(pokemonName)

            //Then
            expect(result).toBe(true)
        })
        it('should return false if pokemon does not exist', async () => {
            //Given
            const pokemonName: string = 'pudzian'
            global.fetch = jest.fn().mockResolvedValueOnce({
                ok: false
            } as Response)

            //When
            const result = await checkPokemonExistence(pokemonName)

            //Then
            expect(result).toBe(false)
        })
    })

})