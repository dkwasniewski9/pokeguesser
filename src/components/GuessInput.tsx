import React, {useState} from "react";
import {checkPokemonExistance} from "../services/pokemonService.tsx";
interface FormProps {
    sendGuess: (pokemonName: string) => void;
}
const Form:React.FC<FormProps> = (props: FormProps) => {
    const [input, setInput] = useState<string>('')
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const lowerCaseInput = input.toLowerCase()
        const exist: boolean = await checkPokemonExistance(lowerCaseInput)
        if(!exist){
            setError('Pokemon does not exist! Try again')
            return
        }
        setInput('')
        setError('')
        props.sendGuess(lowerCaseInput)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pokemon-input">Enter Pokemon Name: </label>
                <input
                    id="pokemon-input"
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
        </div>
        )
}
export default Form