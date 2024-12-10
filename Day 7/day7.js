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
    for(let equation of t){
        const terms = equation.split(' ');
        const resultEqua = terms[0].substring(0, terms[0].length-1);
        terms.splice(0,1);
        const nbPossibilite = Math.pow(2,terms.length-1);
        const maxLength = (nbPossibilite-1).toString(2).length;
        // console.log('nbPossibilite,maxLength :>> ', nbPossibilite,maxLength);
        // console.log('terms :>> ', terms);
        for (let i = 0; i < nbPossibilite; i++) {
            let bin = i.toString(2);
            bin = '0'.repeat(maxLength - bin.length) + bin;
            // console.log('bin :>> ', bin);
            //compute 
            const operators = bin.split('').map(m => { 
                return (m == '0') ? '+': '*'
            });
            let sum = 0;
            sum = parseInt(terms[0]);
            for (let j = 0; j < terms.length-1; j++) {
                let operator = operators.splice(0,1)[0];
                switch (operator) {
                    case '+':
                        sum = sum + parseInt(terms[j+1]);
                        break;
                    case '*':
                        sum = sum * parseInt(terms[j+1]);
                        break;
                }
                // console.log('calc :>> ', sum,'<=', parseInt(terms[j]), operator,parseInt(terms[j + 1]));
            }
            if (sum == resultEqua)
            {
                // console.log('sum :>> ', sum);
                result += sum;
                break;
            } else {
                // console.log('sum <> ', sum, resultEqua);
            }
        }
    }
    return result;
}

function part_two(t) {
    let result = 0;
    for (let equation of t) {
        const terms = equation.split(' ');
        const resultEqua = terms[0].substring(0, terms[0].length - 1);
        terms.splice(0, 1);
        const nbPossibilite = Math.pow(3, terms.length - 1);
        const maxLength = (nbPossibilite - 1).toString(3).length;
        // console.log('nbPossibilite,maxLength :>> ', nbPossibilite,maxLength);
        // console.log('terms :>> ', terms);
        for (let i = 0; i < nbPossibilite; i++) {
            let bin = i.toString(3);
            bin = '0'.repeat(maxLength - bin.length) + bin;
            // console.log('bin :>> ', bin);
            //compute 
            const operators = bin.split('').map(m => {
                switch (m) {
                    case '0':
                        return '+';
                    case '1':
                        return '*';
                    case '2':
                        return '|';
                }
            });
            let sum = 0;
            sum = parseInt(terms[0]);
            for (let j = 0; j < terms.length - 1; j++) {
                let operator = operators.splice(0, 1)[0];
                switch (operator) {
                    case '+':
                        sum = sum + parseInt(terms[j + 1]);
                        break;
                    case '*':
                        sum = sum * parseInt(terms[j + 1]);
                        break;
                    case '|':
                        sum = parseInt([sum, terms[j + 1]].join(''));
                        break;
                }
                if (sum > resultEqua)
                    break;
                // console.log('calc :>> ', sum,'<=', parseInt(terms[j]), operator,parseInt(terms[j + 1]));
            }
            if (sum == resultEqua) {
                // console.log('sum :>> ', sum);
                result += sum;
                break;
            } else {
                // console.log('sum <> ', sum, resultEqua);
            }
        }
    }
    return result;
}

main();
