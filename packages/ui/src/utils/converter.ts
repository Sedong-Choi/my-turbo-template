
export const convertUnitsToPx = (value: string, baseUnit = '16px'): string =>{
    
    const unitRegex = /(\d+)(px|rem|em|vh|vw|%)/;
    const [, numericValue, unit] = value.match(unitRegex) || [];

    if (!numericValue || !unit) {
        return value;
    }

    const numeric = parseFloat(numericValue);

    switch (unit) {
        case 'rem':
            return `${numeric * parseFloat(baseUnit)}px`;
        case 'em':
            return `${numeric * parseFloat(baseUnit)}px`;
        case 'vh':
            return `${(numeric * window.innerHeight) / 100}px`;
        case 'vw':
            return `${(numeric * window.innerWidth) / 100}px`;
        case '%':
            return `${(numeric * window.innerWidth) / 100}px`;
        default:
            return value;
    }
}