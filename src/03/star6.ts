import * as fs from 'fs';

const inputFile: string = './static/03/input';

/* Use the binary data in your diagnostic report to calculate the oxygen generator rating and
 * CO2 scrubber rating, then multiply them together
 */
function getLifeSupportRating(file: string): number {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    let oxygenRating: string = '';
    let CO2Rating: string = '';
    function filterByBit(data: Array<string>, bit: number, mostCommonValue: boolean): Array<string> {
        let zeroBits: number = 0;
        let oneBits: number = 0;
        for (const num of data) {
            if (num !== '') {
                if (num[bit] === '0') {
                    zeroBits++;
                } else if (num[bit] === '1') {
                    oneBits++;
                }
            }
        }
        if (mostCommonValue) {
            if (oneBits >= zeroBits) {
                data = data.filter(n => { return n[bit] === '1' });
            } else {
                data = data.filter(n => { return n[bit] === '0' });
            }
        } else {
            if (zeroBits <= oneBits) {
                data = data.filter(n => { return n[bit] === '0' });
            } else {
                data = data.filter(n => { return n[bit] === '1' });
            }
        }
        return data;
    }
    function getOxygenRating(data: Array<string>): string {
        let bits = 0;
        let filteredData = data;
        while (filteredData.length > 1) {
            filteredData = filterByBit(filteredData, bits, true);
            bits++;
        }
        return filteredData[0];
    }
    function getCO2Rating(data: Array<string>): string {
        let bits = 0;
        let filteredData = data;
        while (filteredData.length > 1) {
            filteredData = filterByBit(filteredData, bits, false);
            bits++;
        }
        return filteredData[0];
    }
    oxygenRating = getOxygenRating(data);
    CO2Rating = getCO2Rating(data);
    return parseInt(oxygenRating, 2) * parseInt(CO2Rating, 2);
}

console.log('--- Day 3: Binary Diagnostic ---');
let lifeSupportRating = getLifeSupportRating(inputFile);
console.log(`Life support rating: ${lifeSupportRating}`);
