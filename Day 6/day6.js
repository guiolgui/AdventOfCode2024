const tools = require('../General/tools');

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n')
            console.time('P1');
            let guardPath = part_one([...t]);
            console.log('Partie 1 :>> ', guardPath.length);
            console.timeEnd('P1');

            // console.log('guardPath :>> ', guardPath);

            console.time('P2');
            console.log('Partie 2 :>> ', part_two(t, guardPath));
            console.timeEnd('P2');
            // tools.writeFileSync('./output_test', t.join('\r\n'));
        })
        .catch((err) => {
            console.error(err);
        });
}
//╔═══╗
//╠═╦═╣
//║■╬■║
//╠═╩═╣
//╚═══╝
const opFacing = {
    up: [-1, 0,'║'],
    right: [0, 1,'═'],
    down: [1, 0,'║'],
    left: [0, -1,'═']
}

function part_one(t) {
    let result = 0;
    //find beggining
    const index = t.join('').indexOf('^');
    const [h,w] = [t.length, t[0].length]
    const [rowOr, colOr] = [Math.floor(index / h), index % h];
    let [rowAct, colAct] = [rowOr, colOr];    
    let facing = 'up';
    const guardNormalPath = [];
    do {
        if (t[rowAct][colAct] == '#') {
            rowAct -= opFacing[facing][0];
            colAct -= opFacing[facing][1];
            const keys = Object.keys(opFacing);
            let keyIndex = keys.findIndex((f) => f == facing);
            if (keyIndex == keys.length - 1){
                keyIndex = -1;
            }
            facing = keys[keyIndex+1];
            // console.log('turning ', facing);
            continue;
        }
        //remplacer l'endroit quitté par un 'X'
        let line = t[rowAct].split('');
        line[colAct] = 'X';
        t[rowAct] = line.join('');
        guardNormalPath.push([rowAct, colAct].join(';'));
        //se déplacer
        rowAct += opFacing[facing][0];
        colAct += opFacing[facing][1];
    } while (!(rowAct < 0 || colAct < 0 || rowAct >= h || colAct>=w));
    
    // return [guardNormalPath.filter(onlyUnique),t.join('').split('X').length-1];
    guardNormalPath.splice(0,1);
    return guardNormalPath.filter(onlyUnique);
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

function part_two(t, gPath) {
    let result = 0;
    const index = t.join('').indexOf('^');
    const [h, w] = [t.length, t[0].length];
    const [rowOr, colOr] = [Math.floor(index / h), index % h];
    //on va pour chaque pas du garde
    // gPath = ['6;3','7;5','7;6']
    for (let i = 0; i < gPath.length; i++) {
        let facing = 'up';
        // console.log('object :>> ', t);
        let maze = t.map(m => m.split(''));
        let obstacle = gPath[i].split(';').map(m => parseInt(m));
        maze[obstacle[0]][obstacle[1]] = '#';
        // console.log('obstacle en :>> ', obstacle);
        // console.log(maze.map(m => m.join('')).join('\r\n'));
        let infinite = false;
        let [rowAct, colAct] = [rowOr, colOr];
        let alreadyGo = {};
        do {
            if (maze[rowAct][colAct] == '#') {
                rowAct -= opFacing[facing][0];
                colAct -= opFacing[facing][1];
                const keys = Object.keys(opFacing);
                let keyIndex = keys.findIndex((f) => f == facing);
                if (keyIndex == keys.length - 1) {
                    keyIndex = -1;
                }
                facing = keys[keyIndex + 1];
                // console.log('turning ', facing);
                continue;
            }
            //logguer le déplacement
            let goTo = [parseInt(rowAct).toString(), parseInt(colAct).toString(),facing].join(';')
            if (alreadyGo[goTo]){
                infinite = true;
                break;
            } else {
                alreadyGo[goTo] = true;
            }
            //se déplacer
            rowAct += opFacing[facing][0];
            colAct += opFacing[facing][1];
        } while (!(rowAct < 0 || colAct < 0 || rowAct >= h || colAct >= w));
        if (infinite){
            // console.log('infinite :>> ', [parseInt(rowAct).toString(), parseInt(colAct).toString(), facing].join(';'));
            result++;
        } else {
            // console.log('alreadyGo :>> ', alreadyGo);
        }
    }
    return result;
}

// function part_two(t) {
//     let result = 0;
//     //find beggining
//     const index = t.join('').indexOf('^');
//     const [h, w] = [t.length, t[0].length];
//     const [rowOr, colOr] = [Math.floor(index / h), index % h];
//     console.log('rowOr,colOr :>> ', rowOr, colOr);
//     let [rowAct, colAct] = [rowOr, colOr];
//     let facing = 'up';
//     let lastDir = 'up';
//     let maxStep = 225 + 3;
//     do {
//         if (t[rowAct][colAct] == '#') {
//             rowAct -= opFacing[facing][0];
//             colAct -= opFacing[facing][1];
//             const keys = Object.keys(opFacing);
//             let keyIndex = keys.findIndex((f) => f == facing);
//             if (keyIndex == keys.length - 1) {
//                 keyIndex = -1;
//             }
//             facing = keys[keyIndex + 1];
//             console.log('turning ', facing);
//             continue;
//         }
//         //remplacer l'endroit quitté par un 'X'
//         let line = t[rowAct].split('');
//         // line[colAct] = 'X';
//         line[colAct] = get_char(line[colAct], facing, lastDir);
//         lastDir = facing;
//         t[rowAct] = line.join('');
//         //se déplacer
//         rowAct += opFacing[facing][0];
//         colAct += opFacing[facing][1];
//         if (maxStep-- < 0){
//             break;
//         }
//     } while (!(rowAct < 0 || colAct < 0 || rowAct >= h || colAct >= w));
//     // console.log('t :>> ', t);
//     console.log('out!');
//     return result;
// }

// function get_char(currentChar, dir, lastDir){
//     console.log('currentChar,dir,lastDir :>> ', currentChar, dir, lastDir);
//     //╔═══╗
//     //╠═╦═╣
//     //║■╬■║
//     //╠═╩═╣
//     //╚═══╝
//     if (currentChar == '.' || currentChar == '^' || currentChar == opFacing[dir][2]){
//         return opFacing[dir][2];
//     }
//     if (currentChar == '║' && dir == 'left' && dir != lastDir) {
//         return '╝';
//     }
//     if (currentChar == '║' && dir == 'right' && dir != lastDir) {
//         return '╔';
//     }
//     if (currentChar == '═' && dir == 'up' && dir != lastDir) {
//         return '╚';
//     }
//     if (currentChar == '═' && dir == 'down' && dir != lastDir) {
//         return '╗';
//     }
//     // if (currentChar == '║' && dir == 'right') {
//     //     return '╠';
//     // }
//     // if (currentChar == '═' && dir == 'up') {
//     //     return '╩';
//     // }
//     // if (currentChar == '═' && dir == 'down') {
//     //     return '╦';
//     // }
//     return '╬';
// }

main();
