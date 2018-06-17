/**
 * Convert first letter of lowercase string input to nr of alphabet
 * @param {string} alpha
 * @return {number}
 */
export function getNrOfAlphabet(alpha: string = ''): number {
    const nr = alpha.charCodeAt(0);
    return nr >= 97 && nr <= 122 ? nr - 96 : -1;
}
