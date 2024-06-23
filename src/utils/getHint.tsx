export function getHint(guess: string | number | string[], correct: string | number | string[]): string{
    if(guess === correct ){
        return 'correct'
    }
    if(typeof guess === 'string'){
            return 'wrong'
    }
    else if(typeof guess === 'number'){
        return 'higher'
    }
    else {
        if(guess.some(type  => (correct as string[]).includes(type))){
            return 'partial'
        }
        else{
            return 'wrong'
        }
    }
}