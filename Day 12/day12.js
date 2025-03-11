const tools = require('../General/tools');

function main() {
    // tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
    const sFileInput = 'input'; 
    // const sFileInput = 'input_test';
    // const sFileInput = 'input_test_2';
    // const sFileInput = 'input_test_3';
    tools.readFileSync(require('path').resolve(__dirname, sFileInput))
        .then((data) => { 
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n');
            // let t = data.split('\r\n').map(m => m.split(''));
            console.time('P1');
            console.log('Partie 1 :>> ',part_one(t.map((x)=>x.split(''))));
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
    const width = t[0].length;
    const height = t.length;
    let areaID = -1;
    const oHistory = {};
    const oArea = {};
    //parcours de la matrice
    for (let row = 0; row < height; row++){
        for (let col = 0; col < width; col++){
            let currentArea = -1;
            currentArea = determineArea(row, col, oHistory, t, true, areaID);
            if (oArea[currentArea] == undefined){
                oArea[currentArea] = { id: t[row][col], area: 0, fence: 0 };
                areaID = currentArea;
            }
            oArea[currentArea].area++;

            //si on est tout en haut (ou que c'est une lettre différente)
            if (row === 0 || t[row][col] !== t[row - 1][col]){
                oArea[currentArea].fence++;
            }

            //si on est tout en bas (ou que c'est une lettre différente)
            if (row === height - 1 || t[row][col] !== t[row + 1][col]) {
                oArea[currentArea].fence++;
            }

            //si on est tout a gauche (ou que c'est une lettre différente)
            if (col === 0 || t[row][col] !== t[row][col - 1]) {
                oArea[currentArea].fence++;
            }
            //si on est tout a droite (ou que c'est une lettre différente)
            if (col === width - 1 || t[row][col] !== t[row][col + 1]) {
                oArea[currentArea].fence++;
            }
        }
    }
    
    // console.log('oArea :>> ', oArea);
    // console.log('oHistory :>> ', oHistory);
    Object.values(oArea).forEach((o)=>{
        //console.log('A region of', o.id, 'plants with price', o.area, '*', o.fence, '=', (o.area * o.fence));
        result+=o.area*o.fence;
    });

    return result;
}

function determineArea(iRow, iCol, oHistory, t, bFirst, currentArea) {
    //si déjà determiné, alors on sort
    if (oHistory[[iRow, ';', iCol].join('')] != undefined){
        return oHistory[[iRow, ';', iCol].join('')];
    } else {
        if (bFirst) {
            currentArea++;
        }
        oHistory[[iRow, ';', iCol].join('')] = currentArea;
    }

    const width = t[0].length;
    const height = t.length;

    if (iRow != 0 && t[iRow][iCol] == t[iRow - 1][iCol]){
        determineArea(iRow - 1, iCol, oHistory, t, false, currentArea);
    }
    if (iCol != 0 && t[iRow][iCol] == t[iRow][iCol - 1]){
        determineArea(iRow, iCol - 1, oHistory, t, false, currentArea);
    }
    if (iRow != height - 1 && t[iRow][iCol] == t[iRow + 1][iCol]){
        determineArea(iRow + 1, iCol, oHistory, t, false, currentArea);
    }
    if (iCol != width - 1 && t[iRow][iCol] == t[iRow][iCol + 1]){
        determineArea(iRow, iCol + 1, oHistory, t, false, currentArea);
    }
    return currentArea;
}

function part_two(t) {
    let result = 0;
    const width = t[0].length;
    const height = t.length;
    let areaID = -1;
    let currentArea = -1;
    const oHistory = {};
    const oArea = {};
    //parcours de la matrice
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {            
            currentArea = determineArea(row, col, oHistory, t, true, areaID);
            if (oArea[currentArea] == undefined) {
                const points = {};
                oArea[currentArea] = { id: t[row][col], area: 0, side: 0 };
                areaID = currentArea;
                //récupérez tous les points d'historique concernant cette area
                const oCases = [];
                for ([key,val] of Object.entries(oHistory)){
                    if (val == currentArea) {
                        oArea[currentArea].area++;
                        let [x,y] = key.split(';');
                        oCases.push({ x: parseInt(x), y: parseInt(y), u: false, r: false, d: false, l: false });
                        
                    }
                }
                oArea[currentArea].side  = nbSide(oCases);

            }       
        }
    }

    Object.values(oArea).forEach((o) => {
        console.log('A region of', o.id, 'plants with price', o.area, '*', o.side, '=', (o.area * o.side));
        result += o.area * o.side;
    });

    return result;
}

function nbSide(cases) {
    let nb = 0;
    cases.sort((a, b) => a.x - b.x || a.y - b.y);
    //pour chaque case, on regarde autour
    cases.forEach((c) => {
        const u = cases.find((c2) => c2.x === c.x - 1 && c2.y === c.y)
        const r = cases.find((c2) => c2.x === c.x && c2.y === c.y + 1)
        const d = cases.find((c2) => c2.x === c.x + 1 && c2.y === c.y)
        const l = cases.find((c2) => c2.x === c.x && c2.y === c.y - 1)

        //si pas de case en haut, et qu'on a pas déjà compté haut pour une des cases de côtés, alors on incrémente
        if (u == undefined) {
            c.u = true
            if (
                (r == undefined || r.u == false) &&
                (l == undefined || l.u == false)
            ) {
                nb++
            }
        }
        if (r == undefined) {
            c.r = true
            if (
                (u == undefined || u.r == false) &&
                (d == undefined || d.r == false)
            ) {
                nb++
            }
        }
        if (d == undefined) {
            c.d = true
            if (
                (r == undefined || r.d == false) &&
                (l == undefined || l.d == false)
            ) {
                nb++
            }
        }
        if (l == undefined) {
            c.l = true
            if (
                (u == undefined || u.l == false) &&
                (d == undefined || d.l == false)
            ) {
                nb++
            }
        }
    })
    return nb;
}

main();
