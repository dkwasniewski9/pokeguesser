import React, {useState} from "react";
import {checkPokemonExistence} from "../services/pokemonService.tsx";
import "../styles/GuessInput.css"

interface FormProps {
    sendGuess: (pokemonName: string) => void;
}

const Form: React.FC<FormProps> = (props: FormProps) => {
    const [input, setInput] = useState<string>('')
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const lowerCaseInput = input.toLowerCase()
        const exist: boolean = await checkPokemonExistence(lowerCaseInput)
        if (!exist) {
            setError('Pokemon does not exist! Try again')
            return
        }
        setInput('')
        setError('')
        props.sendGuess(lowerCaseInput)
    }
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="pokemon-input" className="form-label">Enter Pokemon Name:</label>
                <input
                    id="pokemon-input"
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="form-input"
                />
                <button type="submit" className="form-button">Submit</button>
            </form>
            {error && <p className="form-error">{error}</p>}
        </div>
    )
}
export default Form