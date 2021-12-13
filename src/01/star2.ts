import * as fs from 'fs';
import * as readline from 'readline';

const inputFile: string = './static/01/input';

/* Part Two: Count the number of times the sum of measurements in this sliding window increases from the previous sum */

async function timesSumsIncreased(file: string): Promise<void> {
    const rl = readline.createInterface({
        input: fs.createReadStream(file)
    });

    let depthSumIncreases: number = 0;
    let depthCount: number = 0;
    let curDepths: [any, any, any] = [undefined, undefined, undefined];
    let curDepthSum: any = undefined;
    let prevDepthSum: any = undefined;

    for await (const depth of rl) {
        curDepths[0] = curDepths[1];
        curDepths[1] = curDepths[2];
        curDepths[2] = Number(depth);
        if (curDepths[0] != undefined && curDepths[1] != undefined && curDepths[2] != undefined) {
            curDepthSum = curDepths[0] + curDepths[1] + curDepths[2];
            if (curDepthSum != undefined && prevDepthSum != undefined && curDepthSum > prevDepthSum) {
                depthSumIncreases++;
            }
        }
        prevDepthSum = curDepthSum;
        depthCount++;
    };

    console.log(`${depthSumIncreases} sums are larger than the previous sum.`);
}

console.log('--- Day 1: Sonar Sweep ---');
timesSumsIncreased(inputFile);
