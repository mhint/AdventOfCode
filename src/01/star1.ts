import * as fs from 'fs';

const inputFile: string = './static/01/input';

/* Count the number of times a depth measurement increases from the previous measurement */
function timesIncreased(file: string): number {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    let depthIncreases: number = 0;
    let depthCount: number = 0;
    let curDepth: any = undefined;
    let prevDepth: any = undefined;
    for (const depth of data) {
        curDepth = Number(depth);
        if (curDepth != undefined && prevDepth != undefined) {
            if (curDepth > prevDepth) {
                depthIncreases++;
            }
        }
        prevDepth = curDepth;
        depthCount++;
    }
    return depthIncreases;
}

console.log('--- Day 1: Sonar Sweep ---');
let increases = timesIncreased(inputFile);
console.log(`${increases} measurements are larger than the previous measurement.`);
