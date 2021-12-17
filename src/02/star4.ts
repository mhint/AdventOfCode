import * as fs from 'fs';

const inputFile: string = './static/02/input';
interface Position {
    x: number;
    y: number;
    aim: number;
}

/* Calculate the horizontal position and depth you would have after following the planned course */
function calculatePosition(file: string): Position {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    let pos: Position = { x: 0, y: 0, aim: 0 }
    for (const command of data) {
        const direction = command.split(' ')[0];
        const magnitude = Number(command.split(' ')[1]);
        switch (direction) {
            case 'forward':
                pos.x += magnitude;
                pos.y += pos.aim * magnitude;
                break;
            case 'up':
                pos.aim += magnitude;
                break;
            case 'down':
                pos.aim -= magnitude;
                break;
        }
    }
    return pos;
}

console.log('--- Day 2: Dive! ---');
let finalPos = calculatePosition(inputFile);
console.log(`Horizontal position: ${finalPos.x}\nDepth: ${finalPos.y * -1}`);
console.log(`${finalPos.x} * ${finalPos.y * -1} = ${finalPos.x * finalPos.y * -1}`);
