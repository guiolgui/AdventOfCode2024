const tools = require('../General/tools');

const separator = String.fromCharCode(46);
const startCharId = 48;

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n')[0].split('');
            // console.log('t :>> ', t);
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

    //Etape 1 : écrire en bloc individuel
    let str='';
    // console.log('t.length :>> ', t.length);
    for(let i = 0;i<t.length;i++){
        // console.log('i=>',i);
        if(i%2 == 0){
            // console.log('---file---');            
            //file block
            const idFile = (i / 2);
            str += String.fromCharCode(startCharId + idFile).repeat(parseInt(t[i]));
        } else {
            // console.log('---empty---');
            //empty block
            str += separator.repeat(parseInt(t[i]));
        }
    }

    // tFile = str.split('');
    tFileR = str.split('');

    //Etape 2 :réorganisation
    let indexFileFin = tFileR.length - 1;
    let indexFileDebut = 0;
    // let indexFile = tFile.length;
    // let indexFileR = 0;
    do {
        if (tFileR[indexFileDebut] != separator){
            indexFileDebut++;
            continue;
        }
        if (tFileR[indexFileFin] == separator){
            indexFileFin--;
            continue;
        }
        // console.log('inversersion :>> ', indexFileDebut, indexFileFin, tFileR[indexFileDebut], tFileR[indexFileFin]);
        tFileR[indexFileDebut] = tFileR[indexFileFin];
        tFileR[indexFileFin] = separator;
        indexFileDebut++;
        indexFileFin--;
    } while (indexFileFin > indexFileDebut);

    //Etape 3 : calcul du checksum
    for (let i = 0; i < tFileR.length; i++) {        
        if (tFileR[i] == separator){
            break;
        }
        // console.log('i * tFileR[i].charCodeAt()-startCharId :>> ', i,tFileR[i].charCodeAt(),startCharId, i * (tFileR[i].charCodeAt() - startCharId));
        result += i * (tFileR[i].charCodeAt()-startCharId);
    }
    
    // tools.writeFileSync('./output_test', [t.join(''), str, tFileR.join('')].join('\r\n'));
    // tools.writeFileSync('./output', [t.join(''), str, tFileR.join('')].join('\r\n'));
    return result;
}

function part_two(t) {
    let result = 0;

    //Etape 1 : écrire en bloc individuel
    let str = '';
    let occurence = {};
    // console.log('t.length :>> ', t.length);
    for (let i = 0; i < t.length; i++) {
        // console.log('i=>',i);
        if (i % 2 == 0) {
            // console.log('---file---');            
            //file block
            const idFile = (i / 2);
            let char = String.fromCharCode(startCharId + idFile);
            str += char.repeat(parseInt(t[i]));
            occurence[char] = parseInt(t[i]);
        } else {
            // console.log('---empty---');
            //empty block
            str += separator.repeat(parseInt(t[i]));
        }
    }

    // const blank = '&';
    // let strReorg = str.replaceAll(separator,'&');
    let strReorg = str;
    const escapeChar = '.^$*+?()[{\|'.split('');
    // // tFile = str.split('');
    // tFileR = str.split('');

    // Etape 2 :réorganisation
    const entries = Object.entries(occurence);
    // console.log('occurence :>> ', occurence);
    // console.log('entries :>> ', entries);
    for (let i = entries.length - 1; i > 0; i--) {
        // console.log(strReorg);
        try {
            const spaceS = separator.repeat(entries[i][1]);
            const spaceRegex = spaceS.replaceAll(separator,'\\'+separator);
            const rep = entries[i][0].repeat(entries[i][1]);
            let repRegex = rep;
            if (escapeChar.includes(entries[i][0])){
                repRegex = repRegex.replaceAll(entries[i][0], '\\' + entries[i][0]);
            }
            let indexSpace = strReorg.search(spaceRegex);
            let indexRep = strReorg.search(repRegex);
            // console.log('spaceS,rep :>> ', spaceS, rep);
            // console.log('strReorg :>> ', strReorg);
            // console.log('indexSpace,indexRep :>> ', indexSpace, indexRep);
            if (indexSpace != -1 && indexSpace < indexRep){
                // console.log('déplacement de :>> ', indexSpace,spaceS, entries[i][0]);
                strReorg = strReorg.replace(rep,spaceS);
                strReorg = strReorg.replace(spaceS,rep);
                // console.log(strReorg);
                }
        } catch (error) {
            console.log('error :>> ', error);
            console.log('rep :>> ', rep);
            exit;
        }
    }
    // strReorg = strReorg.replaceAll('&', separator);   

    tFileR = strReorg.split('');
    //Etape 3 : calcul du checksum
    for (let i = 0; i < tFileR.length; i++) {
        if (tFileR[i] == separator) {
            continue;
        }
        // console.log('i * tFileR[i].charCodeAt()-startCharId :>> ', i,tFileR[i].charCodeAt(),startCharId, i * (tFileR[i].charCodeAt() - startCharId));
        result += i * (tFileR[i].charCodeAt() - startCharId);
    }

    // tools.writeFileSync('./output_test_2', [t.join(''), str, strReorg].join('\r\n'));
    return result;
}

main();
