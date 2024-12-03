const tools = require('../General/tools');

function main() {
    // tools.readFileSync('./input')
    tools.readFileSync('./input_test')
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n')
            console.time('P1');
            console.log('Partie 1 :>> ',part_one(t));
            console.timeEnd('P1');

            // console.time('P2');
            // console.log('Partie 2 :>> ',part_two(t));
            // console.timeEnd('P2');
        })
        .catch((err) => {
            console.error(err);
        });
}

function part_one(t) {
    let result = 0;

    return result;
}

function part_two(t) {
    let result = 0;
    return result;
}

main();
