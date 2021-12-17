import * as fs from 'fs';

const inputFile: string = './static/01/input';

/* Count the number of times the sum of measurements in this sliding window increases from the
 * previous sum
 */
function timesSumsIncreased(file: string): number {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    let depthSumIncreases: number = 0;
    let depthCount: number = 0;
    let curDepths: [any, any, any] = [undefined, undefined, undefined];
    let curDepthSum: any = undefined;
    let prevDepthSum: any = undefined;
    for (const depth of data) {
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
    }
    return depthSumIncreases;
}

console.log('--- Day 1: Sonar Sweep ---');
let increases = timesSumsIncreased(inputFile);
console.log(`${increases} sums are larger than the previous sum.`);
