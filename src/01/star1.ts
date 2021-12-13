import * as fs from 'fs';
import * as readline from 'readline';

const inputFile: string = './static/01/input';

/* Count the number of times a depth measurement increases from the previous measurement */
async function timesIncreased(file: string): Promise<void> {
    const rl = readline.createInterface({
        input: fs.createReadStream(file)
    });
    let depthIncreases: number = 0;
    let depthCount: number = 0;
    let curDepth: any = undefined;
    let prevDepth: any = undefined;
    for await (const depth of rl) {
        curDepth = Number(depth);
        if (curDepth != undefined && prevDepth != undefined) {
            if (curDepth > prevDepth) {
                depthIncreases++;
            }
        }
        prevDepth = curDepth;
        depthCount++;
    };
    console.log(`${depthIncreases} measurements are larger than the previous measurement.`);
}

console.log('--- Day 1: Sonar Sweep ---');
timesIncreased(inputFile);
