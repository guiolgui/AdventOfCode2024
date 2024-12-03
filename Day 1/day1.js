const tools = require('../General/tools');

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            let t = data.split('\r\n')
            let lists = parseList(t);

            console.time('P1');
            console.log('Partie 1 :>> ', part_one(lists[0], lists[1]));
            console.timeEnd('P1');

            console.time('P2');
            console.log('Partie 2 :>> ', part_two(lists[0], lists[1]));
            console.timeEnd('P2');
        })
        .catch((err) => {
            console.error(err);
        });
}

function parseList(t) {
    let list1 = [];
    let list2 = [];
    for (let line of t) {
        let splitted = line.split('   ');
        list1.push(splitted[0]);
        list2.push(splitted[1]);
    }
    list1.sort((a, z) => a - z);
    list2.sort((a, z) => a - z);
    return [list1,list2];
}

function part_one(list1, list2) {
    let result = 0;
    for (let i = 0; i < list1.length;i++){
        result += Math.abs(list1[i] - list2[i]);
    }
    return result;
}

function part_two(list1, list2) {
    let result = 0;
    let oOccurence = {};
    for(let id of list2){
        if (!oOccurence[id])
        {
            oOccurence[id] = 0;
        }
        oOccurence[id]++;
    }

    for (let id of list1) {
        result += id * (oOccurence[id] || 0);
    }


    return result;
}

main();
