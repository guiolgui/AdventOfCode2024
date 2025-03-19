const { log } = require('console');
const tools = require('../General/tools');
const simulateSeconds = 100;
// const sizeX = 11; const sizeY = 3;
// const sizeX = 11; const sizeY = 7;
const sizeX = 101; const sizeY = 103;

function main() {
    // tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
    const sFileInput = 'input'; 
    // const sFileInput = 'input_test';
    // const sFileInput = 'input_tree';
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n');
            // let t = data.split('\r\n').map(m => m.split(''));
            const tFormatData = formatData(t);
            // console.time('P1');
            // console.log('Partie 1 :>> ', part_one(tFormatData, simulateSeconds));
            // console.timeEnd('P1');

            // console.time('P2');
            // console.log('Partie 2 :>> ', part_two(tFormatData));
            // console.timeEnd('P2');

            draw(tFormatData, 6771);
        })
        .catch((err) => {
            console.error(err);
        });
}

function formatData(t){
    const data = [];
    t.forEach((e) => {
        let [position,velocity] = e.split(' ');
        let [x, y] = position.split('=')[1].split(',');
        let [vx, vy] = velocity.split('=')[1].split(',');
        data.push({x: parseInt(x), y: parseInt(y), vx: parseInt(vx), vy: parseInt(vy)});
    });
    return data;
}

function part_one(tRobot, simSeconds, bLog=true) {
    let result = 0;
    // const tQuadrant = [
    //     [0,0],
    //     [0,0]
    // ];
    const oQuadrant = {
        q1:0,
        q2:0,
        q3:0,
        q4:0
    }
    const limitX = Math.ceil(sizeX/2);
    const limitY = Math.ceil(sizeY/2);
    if(bLog){
        console.log('Q1\t X de', 0, 'à', limitX - 2, '\t Y de', 0, 'à', limitY - 2);
        console.log('Q2\t X de', limitX, 'à', sizeX - 1, '\t Y de', 0, 'à', limitY - 2);
        console.log('Q3\t X de', 0, 'à', limitX - 2, '\t Y de', limitY, 'à', sizeY - 1);
        console.log('Q4\t X de', limitX, 'à', sizeX - 1, '\t Y de', limitY, 'à', sizeY - 1);
    }
    
    for (const robot of tRobot) {
        const finalPostion = {
            fx: (sizeX + ((robot.x + simSeconds * robot.vx) % sizeX)) % sizeX,
            fy: (sizeY + ((robot.y + simSeconds * robot.vy) % sizeY)) % sizeY

        }
        //Q1
        if (finalPostion.fx <= (limitX - 2) && finalPostion.fy <= (limitY - 2)){
            // tQuadrant[0][0] += 1;
            oQuadrant.q1++;
        } else if (finalPostion.fx >= limitX && finalPostion.fy <= (limitY - 2)) { //Q2
            // tQuadrant[0][1] += 1;
            oQuadrant.q2++;         
        } else if (finalPostion.fx <= (limitX - 2) && finalPostion.fy >= limitY) { //Q3
            // tQuadrant[1][0] += 1;
            oQuadrant.q3++; 
        } else if (finalPostion.fx >= limitX && finalPostion.fy >= limitY) { //Q4
            // tQuadrant[1][1] += 1;
            oQuadrant.q4++; 
        } else {
            if (bLog)
                console.log(finalPostion,'est au milieu (normalement).');
        }
    }

    if (bLog)
        console.log(oQuadrant);
    // return tQuadrant[0][0] * tQuadrant[0][1] * tQuadrant[1][0] * tQuadrant[1][1];
    //multiply all values of oQuadrant
    return Object.values(oQuadrant).reduce((acc, item) => { return acc * item; });
}

function part_two(tRobot) {
    let result = 0;
    const limitX = Math.ceil(sizeX / 2);
    const limitY = Math.ceil(sizeY / 2);
    const oStat = {};

    const total = 100000;
    const step = total / 10;

    for (let i = 1; i <= total; i++) {
        //afficher un log à tous les 10%
        if (i % step === 0) {
            console.log(`${(i / total) * 100}% terminé`);
        }

        const res = part_one(tRobot,i,false);
        if (res == '41306967'
        ){
            console.log('Arrivé à :', i, '=>', res);
        }
        if (oStat[res] == undefined){
            oStat[res] = 0;
        }
        oStat[res]++;
    //     const oChristmasVertical = {};
    //     let found = true;
    //     //une entrée pour chaque y
    //     // for (let y = 0; y < sizeY; y++) {
    //     //     oChristmasVertical[y] = false;
    //     // }
    //     for (const robot of tRobot) {
    //         const finalPostion = {
    //             fx: (sizeX + ((robot.x + i * robot.vx) % sizeX)) % sizeX,
    //             fy: (sizeY + ((robot.y + i * robot.vy) % sizeY)) % sizeY
    //         }
    //         //j'imagine qu'on cherche la forme d'un triangle ?
    //         // genre
    //         //      *
    //         //     ***
    //         //    *****
    //         //   *******
    //         //donc la ligne 0 ne doit pas avoir de robot autre qu'au milieu
    //         if (finalPostion.fx < ((limitX - 1) - ((finalPostion.fy + 1) - 1)) || finalPostion.fx > ((limitX - 1) + ((finalPostion.fy + 1) - 1))){
    //             //pas bon !
    //             //console.error('Incompatible');
    //             found = false;
    //             break;
    //         }
    //     }
    //     if (found) {
    //         console.log('🎄 Trouvé !', i);
    //         break;
    //     }
    }
    const finish = Object.entries(oStat).sort((a, z) => z[1] - a[1]).slice(0, 5);
    console.log(Object.entries(oStat).sort((a, z) => a[0] - z[0]).slice(0, 5));
    console.log('finish');
    console.log(finish);
    // un peu en brute force mais la théorie était qu'un arbre de noel était surement symétrique, donc beaucoup d'arbre au centre, et donc un petit coeff final
    // donc j'ai fait tourner une fois pour avoir tous les coeff, et les trier de manière croissante, puis ajouter le if dans la boucle pour detecter la premiere occurence de ce coeff

    return result;
}
function draw(tRobot, simSeconds) {
    //construire un cadre de sizeX sur sizeY
    const tOutput = [];
    for (let y = 0; y < sizeY; y++) {
        let line = [];
        for(let x = 0;x<sizeX;x++){
            line.push('.');
        }
        tOutput.push(line);
    }

    for (const robot of tRobot) {
        const finalPostion = {
            fx: (sizeX + ((robot.x + simSeconds * robot.vx) % sizeX)) % sizeX,
            fy: (sizeY + ((robot.y + simSeconds * robot.vy) % sizeY)) % sizeY            
        }

        tOutput[finalPostion.fy][finalPostion.fx] = 'X';
    }
    tools.writeFileSync('./output_' + simSeconds, tOutput.map(x=>x.join('')).join('\r\n'));
}

main();
