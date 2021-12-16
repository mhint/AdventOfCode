import * as fs from 'fs';

const inputFile: string = './static/02/input';
interface Position {
    x: number;
    y: number;
}

/* Calculate the horizontal position and depth you would have after following the planned course */
function calculatePosition(file: string): Position {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    let pos: Position = { x: 0, y: 0 }
    for (const command of data) {
        const direction = command.split(' ')[0];
        const distance = Number(command.split(' ')[1]);
        switch (direction) {
            case 'forward':
                pos.x += distance;
                break;
            case 'up':
                pos.y += distance;
                break;
            case 'down':
                pos.y -= distance;
                break;
        }
    }
    return pos;
}

console.log('--- Day 2: Dive! ---');
let finalPos = calculatePosition(inputFile);
console.log(`Horizontal position: ${finalPos.x}\nDepth: ${finalPos.y * -1}`);
console.log(`${finalPos.x} * ${finalPos.y * -1} = ${finalPos.x * finalPos.y * -1}`);
