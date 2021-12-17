import * as fs from 'fs';

const inputFile: string = './static/03/input';

/* Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate,
 * then multiply them together
 */
function getLifePowerConsumption(file: string): number {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    const numDigits = 12;
    let zeroBits: Array<number> = new Array(12).fill(0);
    let oneBits: Array<number> = new Array(12).fill(0);
    let gammaRate: string = '';
    let epsilonRate: string = '';
    for (const num of data) {
        const curBits = num.split('');
        for (let i = 0; i < numDigits; i++) {
            if (curBits[i] === '0') {
                zeroBits[i] += 1;
            } else if (curBits[i] === '1') {
                oneBits[i] += 1;
            }
        }
    }
    for (let j = 0; j < numDigits; j++) {
        if (oneBits[j] >= zeroBits[j]) {
            gammaRate += '1';
            epsilonRate += '0';
        } else {
            gammaRate += '0'
            epsilonRate += '1';
        }
    }
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

console.log('--- Day 3: Binary Diagnostic ---');
let powerConsumption = getLifePowerConsumption(inputFile);
console.log(`Power consumption: ${powerConsumption}`);
