export function romanToNumber(roman: string) {
    const romanMap: Record<string, number> = {
        'i': 1,
        'v': 5,
        'x': 10
    }

    let total = 0
    let previousValue = 0
    for (let i = roman.length - 1; i >= 0; --i) {
        const currentValue = romanMap[roman[i]]
        if (currentValue < previousValue) {
            total -= currentValue
        } else {
            total += currentValue
        }
        previousValue = currentValue
    }
    return total
}
