import GuessInput from "./GuessInput.tsx";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from "react";

describe('Form component', () => {
    it('should render input with submit button', () => {
        render(<GuessInput sendGuess={jest.fn()}/>)

        expect(screen.getByLabelText('Enter Pokemon Name:')).toBeInTheDocument()

    })
})