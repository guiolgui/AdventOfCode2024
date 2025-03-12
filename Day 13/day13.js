const tools = require('../General/tools');

function main() {
    // tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
    const sFileInput = 'input'; 
    // const sFileInput = 'input_test';
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n');
            // let t = data.split('\r\n').map(m => m.split(''));
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

    //parcours de t 4 ligne par 4 ligne
    const configMachine = []; 
    for(let i = 0; i < t.length; i+=4){
        let mId = Math.floor(i/4) + 1;
        let xA = parseInt(t[i].split('X+')[1].split(',')[0]);
        let yA = parseInt(t[i].split('Y+')[1]);
        let xB = parseInt(t[i+1].split('X+')[1].split(',')[0]);
        let yB = parseInt(t[i+1].split('Y+')[1]);
        let xG = parseInt(t[i+2].split('X=')[1].split(',')[0]);
        let yG = parseInt(t[i+2].split('Y=')[1]);
        configMachine.push({mId,xA,xB,xG,yA,yB,yG});
    }

    // const configMachine = [
    //     { mId:1,xA: 94, xB: 22, xG: 8400, yA : 34,yB : 67,yG : 5400 },
    //     { mId:2,xA: 26, xB: 67, xG: 12748, yA: 66, yB: 21, yG: 12176 },
    //     { mId:3,xA: 17, xB: 84, xG: 7870, yA: 86, yB: 37, yG: 6450 },
    //     { mId:4,xA: 69, xB: 27, xG: 18641, yA: 23, yB: 71, yG: 10279 }
    // ];

    configMachine.forEach(m => {    
        console.log('Machine : ',m.mId);    
        let minToken = 0;
        //Le B coutant 3 fois moins cher que le A, autant commencer 
        const bCheaper = (m.xB * 3 < m.xA);
        const xCheap = bCheaper ? m.xB : m.xA;
        const yCheap = bCheaper ? m.yB : m.yA;
        const xExpensive = bCheaper ? m.xA : m.xB;
        const yExpensive = bCheaper ? m.yA : m.yB;
        const cheapMulti = bCheaper ? 1 : 3;
        const expMulti = bCheaper ? 3 : 1;

        //1ere vérif, est-ce qu'avec 100 mouvement on peut au moins attendre le but
        if ((xCheap * 100 + xExpensive * 100) < m.xG || (yCheap * 100 + yExpensive * 100) < m.yG){
            console.error('//Pas assez de mouvement pour atteindre le but');
            return;
        }
        
        for(let i = 100;i>0;i--){
            //Etape 1 : on appuie i fois sur le bouton B
            let expTimes = (m.xG - xCheap * i ) / xExpensive;
            
            if (expTimes % 1 === 0 && expTimes <= 100){
                
                if (i * yCheap + expTimes * yExpensive === m.yG){
                    let price = (expTimes * expMulti + i * cheapMulti);
                    if (minToken == 0 || price < minToken){
                        minToken = price;
                        if(bCheaper){
                            console.log('A : ', expTimes, ' B : ', i, ' Price : ', price);
                        } else{
                            console.log('A : ', i, ' B : ', expTimes, ' Price : ', price);
                        }                        
                    }
                }
            }
            
        }
        result += minToken;
    });

    return result;
}

function part_two(t) {
    let result = 0;

    //parcours de t 4 ligne par 4 ligne
    const configMachine = [];
    for (let i = 0; i < t.length; i += 4) {
        let mId = Math.floor(i / 4) + 1;
        let xA = parseInt(t[i].split('X+')[1].split(',')[0]);
        let yA = parseInt(t[i].split('Y+')[1]);
        let xB = parseInt(t[i + 1].split('X+')[1].split(',')[0]);
        let yB = parseInt(t[i + 1].split('Y+')[1]);
        let xG = parseInt(t[i + 2].split('X=')[1].split(',')[0]) + 10000000000000;
        let yG = parseInt(t[i + 2].split('Y=')[1]) + 10000000000000;
        configMachine.push({ mId, xA, xB, xG, yA, yB, yG });
    }

    configMachine.forEach(m => {
        //log sepearator line
        console.log('='.repeat(50));
        console.log('🚀 Machine : ', m.mId);
        let [x, y] = solve_equation(m.xA, m.xB, m.xG, m.yA, m.yB, m.yG);
        result += x * 3 + y * 1;
        console.log(`Final result = ${[x, y]} cost = ${x * 3 + y * 1}`);
    });

    return result;
}

// Recursive function to return gcd of a and b
function gcd(a, b) {
    // Everything divides 0 
    if (a == 0)
        return b;
    if (b == 0)
        return a;

    // Base case
    if (a == b)
        return a;

    // a is greater
    if (a > b)
        return gcd(a - b, b);
    return gcd(a, b - a);
}

function compare_lines(a1, b1, a2, b2) {

    // ab' - a'b différent de 0 < -> (S) admet un unique couple solution
    // ab' - a'b = 0 < -> soit(S) n'admet aucun couple solution
    // soit(S) admet une infinité de couples solutions
    if (a1 * b2 - a2 * b1 != 0) {
        console.log("✔️  One solution");
        return true;
    } else {
        //same ❎ but in red ?
        console.log("❌  No solution");
        return false;
    }
}

function solve_equation(a1, b1, c1, a2, b2, c2) {
    if (compare_lines(a1, b1, a2, b2)) {
        let gcd1 = gcd(a1, b1);
        let gcd2 = gcd(a2, b2);
        console.log('🔎 GCD 1 : ', gcd1);
        console.log('🔎 GCD 2 : ', gcd2);
        
        if (c1 % gcd1 != 0) {
            console.log("❌ GCD 1:", gcd1, " not compatible with c1:", c1);
            return [0, 0];
        }
        if (c2 % gcd2 != 0) {
            console.log("❌ GCD 2:", gcd2, " not compatible with c2:", c2);
            return [0, 0];
        }
        let y = (a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1);
        if(y % 1 !== 0){
            console.log("❌ Y is not an integer");
            return [0, 0];
        }
        let x = (c1 - b1 * y) / a1;
        if(x % 1 !== 0){
            console.log("❌ X is not an integer");
            return [0, 0];
        }
        return [x, y];
    }
}

main();
