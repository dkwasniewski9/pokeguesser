import React, {useState} from "react";
import {checkPokemonExistance} from "../services/pokemonService.tsx";

const Form:React.FC = () => {
    const [input, setInput] = useState<string>('')

    const handleSubmit = (event: React.FormEvent) => {
         event.preventDefault();
         checkPokemonExistance(input.toLowerCase())
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Wpisz tekst..."
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        )
}
export default Form