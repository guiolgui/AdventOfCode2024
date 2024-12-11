const tools = require('../General/tools');

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n').map(m=>m.split(''));
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
    let [w,h] = [t[0].length,t.length];

    //Etape 1: on parcours et on note les coordonnées des antennes
    let oAntennes = {};
    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t.length; j++) {
            const element = t[i][j];
            if (element != '.'){
                if (!oAntennes[element]){
                    oAntennes[element] = [];
                }
                oAntennes[element].push([i,j].join(';'));
            }
        }
    }

    //pour chaque antenne, placer ses antinodes
    let oAntiNodes = {};
    let tAntiNodes = [];
    for (const [key,value] of Object.entries(oAntennes)) {
        oAntiNodes[key] = [];
        // console.log('oAntiNodes :>> ', oAntiNodes);
        for (let i = 0; i < value.length-1; i++) {
            const antA = value[i].split(';').map(m=>parseInt(m));
            let j = i + 1;
            while (j < value.length){
                const antB = value[j].split(';').map(m=>parseInt(m));
                j++;
                const distance = [antB[0] - antA[0], antB[1] - antA[1]];
                
                const antinodeA = [antA[0] - distance[0], antA[1] - distance[1]];
                const antinodeB = [antB[0] + distance[0], antB[1] + distance[1]];
                
                //vérification qu'on est dans les limites
                if (antinodeA[0] >= 0 && antinodeA[0] < h && antinodeA[1] >= 0 && antinodeA[1] < w){
                    oAntiNodes[key].push(antinodeA.join(';'));
                }
                if (antinodeB[0] >= 0 && antinodeB[0] < h && antinodeB[1] >= 0 && antinodeB[1] < w){
                    oAntiNodes[key].push(antinodeB.join(';'));
                }
            }
        }
        // oAntiNodes[key] = oAntiNodes[key].filter(onlyUnique);
        tAntiNodes.push(...oAntiNodes[key]);
        // break;
    }
    // console.log('tAntiNodes :>> ', tAntiNodes.filter(onlyUnique));
    return tAntiNodes.filter(onlyUnique).length;
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

function part_two(t) {
    let result = 0;
    let [w, h] = [t[0].length, t.length];

    //Etape 1: on parcours et on note les coordonnées des antennes
    let oAntennes = {};
    for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t.length; j++) {
            const element = t[i][j];
            if (element != '.') {
                if (!oAntennes[element]) {
                    oAntennes[element] = [];
                }
                oAntennes[element].push([i, j].join(';'));
            }
        }
    }

    //pour chaque antenne, placer ses antinodes
    let oAntiNodes = {};
    let tAntiNodes = [];
    for (const [key, value] of Object.entries(oAntennes)) {
        oAntiNodes[key] = [];
        // console.log('oAntiNodes :>> ', oAntiNodes);
        for (let i = 0; i < value.length - 1; i++) {
            const antA = value[i].split(';').map(m => parseInt(m));
            let j = i + 1;
            while (j < value.length) {
                const antB = value[j].split(';').map(m => parseInt(m));
                j++;
                const distance = [antB[0] - antA[0], antB[1] - antA[1]];

                let multi = 0;
                do {
                    const antinodeA = [antA[0] - (distance[0] * multi), antA[1] - (distance[1] * multi)];
                    //vérification qu'on est dans les limites
                    // console.log('antinodeA :>> ', antinodeA);
                    if (antinodeA[0] >= 0 && antinodeA[0] < h && antinodeA[1] >= 0 && antinodeA[1] < w) {
                        oAntiNodes[key].push(antinodeA.join(';'));
                    } else {
                        // console.log('break A!',multi);
                        break;
                    }
                    multi++;
                } while (true);


                multi = 0;
                do {
                    const antinodeB = [antB[0] + (distance[0] * multi), antB[1] + (distance[1] * multi)];
                    // console.log('antinodeB :>> ', antinodeB);
                    //vérification qu'on est dans les limites
                    if (antinodeB[0] >= 0 && antinodeB[0] < h && antinodeB[1] >= 0 && antinodeB[1] < w) {
                        oAntiNodes[key].push(antinodeB.join(';'));
                    } else {
                        // console.log('break B!');
                        break;
                    }
                    multi++;
                } while (true);
            }
        }
        // oAntiNodes[key] = oAntiNodes[key].filter(onlyUnique);
        tAntiNodes.push(...oAntiNodes[key]);
        // break;
    }
    // console.log('tAntiNodes :>> ', tAntiNodes.filter(onlyUnique));
    return tAntiNodes.filter(onlyUnique).length;
    return result;
}

main();
