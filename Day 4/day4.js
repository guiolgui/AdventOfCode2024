const tools = require('../General/tools');

const searchWord = 'XMAS';

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n')
            console.time('P1');
            console.log('Partie 1 :>> ', part_one(t));
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
    
    for([iRow,row] of t.entries()){
        for([iCell,cell] of row.split('').entries()){
            if(cell == searchWord[0]){ 
                result += search_for_word(iRow, iCell, t, searchWord);
            }
        }
    }

    return result;
}

function search_for_word(row, col,t, word) {
    const width = t[0].length;
    const height = t.length;
    const length = word.length;
    // const reversed = word.split('').slice().reverse().join('');
    let cnt = 0;
    let tLookedWord = [];
    let condPosition = {}; 

    const countOccurrences = (arr, val) =>
        arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    //pour ne faire qu'une fois chaque check vu que certains vont se répéter
    condPosition.versDroit = (col + length <= width);
    condPosition.versGauche = ((col - length + 1) >= 0);
    condPosition.versBas = (row + length <= height);
    condPosition.versHaut = ((row - length + 1) >= 0);
    // console.log('row,col,width,height :>> ', row,col,width,height);
    // console.log('condPosition :>> ', condPosition);

    //recherche horizontal
    //à l'endroit
    if (condPosition.versDroit){
        // if(t[row].substring(col,(col+length)) == word){
        //     cnt++;
        // }
        tLookedWord.push(t[row].substring(col, (col + length)));
    }

    //à l'envers
    if (condPosition.versGauche) {
        // console.log((col - length+1),col+1,t[row].substring((col+1 - length),col+1).split('').reverse().join(''));
        tLookedWord.push(t[row].substring((col + 1 - length), col + 1).split('').reverse().join(''));
        // if (t[row].substring(col, (col - length + 1)) == reversed) {
        //     cnt++;
        // }
    }

    //vertical
    //Vers le bas
    if (condPosition.versBas) {
        let vWord = '';
        for (let i = 0; i < length; i++) {
            vWord += t[row+i][col];
        }
        tLookedWord.push(vWord);
    }
    //Vers le haut
    if (condPosition.versHaut) {
        let vWord = '';
        for (let i = 0; i < length; i++) {
            vWord += t[row-i][col];
        }
        tLookedWord.push(vWord);
    }

    //diagonale
    //haut gauche
    if (condPosition.versGauche && condPosition.versHaut) {
        let vWord = '';
        for (let i = 0; i < length; i++) {
            vWord += t[row - i][col - i];
        }
        tLookedWord.push(vWord);
    }

    //haut droit
    if (condPosition.versDroit && condPosition.versHaut) {
        let vWord = '';
        for (let i = 0; i < length; i++) {
            vWord += t[row - i][col + i];
        }
        tLookedWord.push(vWord);
    }

    //bas gauche
    if (condPosition.versGauche && condPosition.versBas) {
        let vWord = '';
        for (let i = 0; i < length; i++) {
            vWord += t[row + i][col - i];
        }
        tLookedWord.push(vWord);
    }

    //bas droit
    if (condPosition.versDroit && condPosition.versBas) {
        let vWord = '';
        for (let i = 0; i < length; i++) {
            vWord += t[row + i][col + i];
        }
        tLookedWord.push(vWord);
    }

    // console.log('tLookedWord :>> ', tLookedWord);
    return countOccurrences(tLookedWord, word);

}

function part_two(t) {
    let result = 0;
    const xword = 'MAS';
    if(xword.length % 2 == 0){
        console.error('Le mot doit contenir un nombre impair de lettres');
        return result;
    }
    const letters = xword.split('');
    let middleLetter = letters.splice(((xword.length-1)/2),1)[0];
    letters.sort((a, z) => a.localeCompare(z))
    // console.log('letters :>> ', letters);

    for ([iRow, line] of t.entries()) {
        for ([iCol, cell] of line.split('').entries()) {
            if (cell == middleLetter) {
                result += check_diagonale(iRow,iCol,t,letters);
            }
        }
    }

    return result;
}

function check_diagonale(row, col, t, tLetters) {
    const width = t[0].length;
    const height = t.length;
    const length = tLetters.length / 2 + 1;
    let condPosition = {};

    //pour ne faire qu'une fois chaque check vu que certains vont se répéter
    condPosition.versDroit = (col + length <= width);
    condPosition.versGauche = ((col - length + 1) >= 0);
    condPosition.versBas = (row + length <= height);
    condPosition.versHaut = ((row - length + 1) >= 0);

    // console.log('row,col,width,height,length :>> ', row,col,width,height,length);
    // console.log('condPosition :>> ', condPosition);

    if (Object.values(condPosition).includes(false)){
        // console.error('diag nok');
       return 0; 
    }

    //Diagonale 1 Haut gauche vers Bas droit
    let diagLetters = [];
    for (let i = ((length-1) * -1); i < length; i++) {
        // console.log('i :>> ', i);
        if(i==0){
            continue;
        }
        diagLetters.push(t[row+i][col+i]);
    }
    // console.log('diagLetters :>> ', diagLetters);
    if (!(diagLetters.sort((a, z) => a.localeCompare(z)).join('') == tLetters.join(''))){
        return 0;
    }

    //Diagonale 2 Haut droit vers Bas gauche
    diagLetters = [];
    for (let i = ((length - 1) * -1); i < length; i++) {
        // console.log('i :>> ', i);
        if (i == 0) {
            continue;
        }
        diagLetters.push(t[row + i][col - i]);
    }
    // console.log('diagLetters :>> ', diagLetters);
    if (!(diagLetters.sort((a, z) => a.localeCompare(z)).join('') == tLetters.join(''))) {
        return 0;
    }
    // console.log('OK ! \trow,col,width,height,length :>> ', row, col, width, height, length);
    return 1;
}

main();
