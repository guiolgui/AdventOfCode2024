const tools = require('../General/tools');

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n').join('');
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
    const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/gm;
    const str = t;
    // let m;

    // while ((m = regex.exec(str)) !== null) {
    //     // This is necessary to avoid infinite loops with zero-width matches
    //     if (m.index === regex.lastIndex) {
    //         regex.lastIndex++;
    //     }

    //     // The result can be accessed through the `m`-variable.
    //     m.forEach((match, groupIndex) => {
    //         console.log(`Found match, group ${groupIndex}: ${match}`);
    //     });
    // }
    
    const matchAll = str.matchAll(regex);
    for (const match of matchAll) {
        // console.log('match :>> ', match[0], match[1], match[2]);
        result += match[1] * match[2];
    }
    return result;
}

function part_two(t) {
    let result = 0; 
    const regex = /do\(\)|don\'t\(\)|mul\(([0-9]{1,3}),([0-9]{1,3})\)/gm;
    const str = t;
    let bMultActive = true;
    const sDo = 'do()';
    const sDont = 'don\'t()';
    const matchAll = str.matchAll(regex);
    for (const match of matchAll) {
        if (match[0][0] == 'd'){
            switch (match[0]) {
                case sDo:
                    bMultActive = true;
                    break;
                case sDont:
                    bMultActive = false;
                    break;
            }
            continue;
        }
        if (bMultActive){
            result += match[1] * match[2];
        }
    }
    return result;
}

main();
