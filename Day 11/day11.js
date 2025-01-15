const { log } = require('console');
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
            let t = data.split(' ');
            // let t = data.split('\r\n').map(m => m.split(''));
            // console.time('P1');
            // console.log('Partie 1 :>> ',part_one(t));
            // console.timeEnd('P1');
            
            t = data.split(' ');
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
    
    // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
    // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
    // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
    
    const blinkingTimes = 6;    
    for (let j = 1; j <= blinkingTimes; j++) {
        for (let i = 0; i < t.length; i++) {
            if (t[i] == '0') {
                // console.log(i,t[i],'R1');
                t[i] = '1';
                continue;
            }
            if ((t[i].length % 2) == 0) {
                // console.log(i,t[i],'R2');
                let l = t[i].length / 2;
                let oldStone = t[i];
                t[i] = parseInt(oldStone.slice(0, l)).toString();
                //inserer une entrée dans t à la position i+1
                t.splice(i + 1, 0, parseInt(oldStone.slice(l)).toString());
                i++;
                // t[i] = [parseInt(splitted.slice(0, l)), parseInt(splitted.slice(l))].join('');
                continue;
            }
            // console.log(i, t[i], 'R3');
            t[i] = (parseInt(t[i]) * 2024).toString();
        }
        //console.log(j,'->',t.join(' '));
    }

    return t.length;
}

const blinkTimes = 75;

function part_two(t) {
    let result = 0;

    // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
    // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
    // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
    

    for (const stone of t) {
        const oSave = {};
        rec(oSave, 0, stone);
        // console.log('oSave :>> ', oSave);
        //on a tous calculé pour la pierre courante, désormais on peut reconstituer pour voir combien de pierre cela fera au final
        result += calc(oSave, 0, stone);
        // let tStone = [stone];
        // console.log('stone :>> ', stone);
        // for (let i = 0; i < blinkTimes; i++) {
        //     // console.log('etape', i + 1,':>>',tStone.length);
        //     let tStoneTmp = [];
        //     for (const s of tStone) {
        //         // console.log('oSave[s] :>> ', s, '->', oSave[s].stones);
        //         //remplacer chaque element de tStone par le ou les entrées de oSave
        //         for (const sSave of oSave[s].stones) {
        //             tStoneTmp.push(sSave);
        //         }
        //     }
        //     tStone = tStoneTmp;
        // }
        // result += tStone.length;
    }
    
    return result;
}

function rec(oSave,cnt,currentStone) {
    if ((oSave[currentStone] && oSave[currentStone].calcAt <= cnt ) || cnt >= blinkTimes) {
        return [];
    }
    oSave[currentStone] = {};
    oSave[currentStone].compute = {};
    if (currentStone == '0') {
        oSave[currentStone].stones = ['1'];
    } else if ((currentStone.length % 2) == 0){
        const l = currentStone.length / 2;
        oSave[currentStone].stones = [parseInt(currentStone.slice(0, l)).toString(),parseInt(currentStone.slice(l)).toString()];
    } else {
        oSave[currentStone].stones = [(parseInt(currentStone)*2024).toString()];
    }
    oSave[currentStone].calcAt = cnt;
    for (const nextStone of oSave[currentStone].stones) {
        rec(oSave,cnt+1,nextStone);
    }
}

function calc(oSave, cnt, currentStone) {
    if (cnt>=blinkTimes) {
        return 1;
    }
    if (oSave[currentStone].compute[cnt]){
        return oSave[currentStone].compute[cnt];
    }
    oSave[currentStone].compute[cnt] = 0;
    if (oSave[currentStone].stones.length == 1) {
        oSave[currentStone].compute[cnt] = calc(oSave, cnt + 1, oSave[currentStone].stones[0]);
    }
    if (oSave[currentStone].stones.length == 2) {
        oSave[currentStone].compute[cnt] = calc(oSave, cnt + 1, oSave[currentStone].stones[0]) + calc(oSave, cnt + 1, oSave[currentStone].stones[1]);
    }
    return oSave[currentStone].compute[cnt];
}


    // const blinkingTimes = 75;
    // for (let j = 1; j <= blinkingTimes; j++) {
    //     for (let i = 0; i < t.length; i++) {
    //         if (t[i] == '0') {
    //             // console.log(i,t[i],'R1');
    //             t[i] = '1';
    //             continue;
    //         }
    //         if ((t[i].length % 2) == 0) {
    //             // console.log(i,t[i],'R2');
    //             let l = t[i].length / 2;
    //             let oldStone = t[i];
    //             t[i] = parseInt(oldStone.slice(0, l)).toString();
    //             //inserer une entrée dans t à la position i+1
    //             t.splice(i + 1, 0, parseInt(oldStone.slice(l)).toString());
    //             i++;
    //             // t[i] = [parseInt(splitted.slice(0, l)), parseInt(splitted.slice(l))].join('');
    //             continue;
    //         }
    //         // console.log(i, t[i], 'R3');
    //         t[i] = (parseInt(t[i]) * 2024).toString();
    //     }
    //     //console.log(j,'->',t.join(' '));
    // }

    // return t.length;
// }

main();
