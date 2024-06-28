import GuessInput from "./GuessInput.tsx";
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import React from "react";
import * as pokemonService from "../services/pokemonService";


describe('Form component', () => {
    const mockSendGuess = jest.fn();
    it('should render input with submit button', () => {
        // Given
        render(<GuessInput sendGuess={mockSendGuess}/>)

        // When
        const input: HTMLInputElement = screen.getByLabelText('Enter Pokemon Name:')
        const button:HTMLElement = screen.getByRole('button')

        // Then
        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })
    it('should update input value on change', () => {
        // Given
        render(<GuessInput sendGuess={mockSendGuess}/>)

        // When
        const input: HTMLInputElement = screen.getByLabelText('Enter Pokemon Name:')
        fireEvent.change(input, {target: {'value': 'eevee'}})

        // Then
        expect(input.value).toBe('eevee')
    })
    it('should display error when Pokemon does not exist', async () => {
        // Given
        jest.spyOn(pokemonService, 'checkPokemonExistence')
            .mockResolvedValue(false)
        render(<GuessInput sendGuess={mockSendGuess}/>)

        // When
        const input: HTMLInputElement = screen.getByLabelText('Enter Pokemon Name:')
        fireEvent.change(input, {target: {'value': 'pudzian'}})
        fireEvent.submit(screen.getByRole('button'))

        // Then
        await waitFor(() => expect(screen.getByText('Pokemon does not exist! Try again')).toBeInTheDocument())
    })

    it('should call sendGuess when Pokemon exists', async () => {
        //Given
        jest.spyOn(pokemonService, 'checkPokemonExistence')
            .mockResolvedValue(true)
        render(<GuessInput sendGuess={mockSendGuess}/>)

        //When
        const input: HTMLInputElement = screen.getByLabelText('Enter Pokemon Name:')
        fireEvent.change(input, {target: {'value': 'eevee'}})
        fireEvent.submit(screen.getByRole('button'))

        //Then
        await waitFor(() => expect(mockSendGuess).toHaveBeenCalledWith('eevee'));
        expect(input).toHaveValue("");
        await waitFor(() => expect(screen.queryByText('Pokemon does not exist! Try again')).not.toBeInTheDocument())
    })
    it('should reset error message on success', async() => {
        //Given
        jest.spyOn(pokemonService, 'checkPokemonExistence')
            .mockResolvedValueOnce(false).mockResolvedValueOnce(true)
        render(<GuessInput sendGuess={mockSendGuess}/>)

        //When
        const input: HTMLInputElement = screen.getByLabelText('Enter Pokemon Name:')
        fireEvent.change(input, {target: {'value': 'pudzian'}})
        fireEvent.submit(screen.getByRole('button'))

        //Then
        await waitFor(() => expect(screen.queryByText('Pokemon does not exist! Try again')).toBeInTheDocument())

        //When
        fireEvent.change(input, {target: {'value': 'eevee'}})
        fireEvent.submit(screen.getByRole('button'))

        //Then
        await waitFor(() => expect(screen.queryByText('Pokemon does not exist! Try again')).not.toBeInTheDocument())
    })
})