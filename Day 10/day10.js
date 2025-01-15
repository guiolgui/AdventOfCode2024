const tools = require('../General/tools');
const finalHeight = '9';

function main() {
    //node get complete path on this file
    // console.log('process.argv[1] :>> ', process.argv[1].split('\\').pop().join('\\'));
    // console.log('__dirname :>> ', );
    // tools.readFileSync('./input')
    // tools.readFileSync('C:\\Users\\Admin\\Documents\\AdventOfCode2024\\Day 10\\input_test')
    const sFileInput = 'input';
    // const sFileInput = 'input_test';
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            // let t = data.split('\r\n');
            let t = data.split('\r\n').map(m => m.split(''));
            console.time('P1');
            console.log('Partie 1 :>> ',part_one(t));
            console.timeEnd('P1');

            console.time('P2');
            console.log('Partie 2 :>> ',part_two(t));
            console.timeEnd('P2');
        })
        .catch((err) => {
            console.error(err);
        });
}

function part_one(t) {
    let result = 0;
    for (let row = 0; row < t.length; row++) {
        for (let col = 0; col < t[row].length; col++) {
            if (t[row][col] == '0') {
                let digitSearch = '1';
                let tFound = search(t, row, col, digitSearch);
                do {
                    let foundRec = [];
                    digitSearch++;
                    for (let found of tFound) {
                        foundRec = foundRec.concat(search(t, found[0], found[1], digitSearch));
                    }
                    foundRec = multiDimensionalUnique(foundRec);
                    tFound = [];
                    if (digitSearch == '9'){
                        result += foundRec.length;
                        // console.log('Trail L:', row,'C:',col,' :>> ', foundRec.length);
                    } else {
                        tFound = [...foundRec];
                    }
                } while (tFound.length > 0)
            }
        }
    }
    return result;
}

function part_two(t) {
    let result = 0;
    for (let row = 0; row < t.length; row++) {
        for (let col = 0; col < t[row].length; col++) {
            if (t[row][col] == '0') {
                let digitSearch = '1';
                let tFound = search(t, row, col, digitSearch);
                do {
                    let foundRec = [];
                    digitSearch++;
                    for (let found of tFound) {
                        foundRec = foundRec.concat(search(t, found[0], found[1], digitSearch));
                    }
                    
                    tFound = [];
                    if (digitSearch == '9') {
                        result += foundRec.length;
                        // console.log('Trail L:', row,'C:',col,' :>> ', foundRec.length);
                    } else {
                        tFound = [...foundRec];
                    }
                } while (tFound.length > 0)
            }
        }
    }
    return result;
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function search(t,row,col,digitSearch){
    let [w, h] = [t[0].length, t.length];
    const tFound = [];

    //up
    if (row - 1 >= 0 && t[row - 1][col] == digitSearch){
        tFound.push([row - 1, col]);
    }
    //left
    if (col - 1 >= 0 && t[row][col - 1] == digitSearch){
        tFound.push([row, col - 1]);
    }
    //down
    if (row + 1 < h && t[row + 1][col] == digitSearch){
        tFound.push([row + 1, col]);
    }
    //right
    if (col + 1 < w && t[row][col + 1] == digitSearch){
        tFound.push([row, col + 1]);
    }

    return tFound;
}

main();
