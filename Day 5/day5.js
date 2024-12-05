const tools = require('../General/tools');

function main() {
    tools.readFileSync('./input')
    // tools.readFileSync('./input_test')
        .then((data) => {
            // console.log('------File------');
            // console.log(data);
            // console.log('----------------');
            const t = data.split('\r\n');
            const [rules, spools] = parseInput(t);
            // console.log(rules, spools);
            const [result, incorrect] = part_one(rules, spools);
            console.time('P1');
            console.log('Partie 1 :>> ', result);
            console.timeEnd('P1');

            // console.log('Incorrect :>> ', incorrect);

            console.time('P2');
            console.log('Partie 2 :>> ', part_two(rules, incorrect));
            console.timeEnd('P2');
        })
        .catch((err) => {
            console.error(err);
        });
}

function parseInput(t){
    let i = 0;
    const rules = [];
    const spools = [];
    for(i;i<t.length;i++){
        if(t[i].includes('|')){
            let [first, last] = t[i].split('|');
            rules.push({ before: parseInt(first), last:parseInt(last)});
        } else {
            break;
        }
    }

    for (i++; i < t.length; i++) {
        spools.push(t[i]);        
    }

    return [rules,spools];
}

function part_one(rules,spools) {
    let result = 0;
    let incorrect = [];

    //pour chaque spool, regarder s'il respecte les règles
    for (let [index,spool] of spools.entries()){
        let pages = spool.split(',').map(m=>parseInt(m));
        let correct = true;
        for (let i = 1; i < pages.length; i++) {
            //check si notre numéro fait partie d'une règle ou il est "avant"
            let foundRules = rules.filter((e) => e.before == pages[i] );
            if (foundRules){
                //si le numéro de la règle 'après' se trouve avant dans notre spool, alors erreur !
                for (let rule of foundRules){
                    if(pages.slice(0,i).includes(rule.last)){
                       correct = false;
                       break;
                    }
                }
            }
            if (!correct)
                break;
        }
        if(correct){
            let middle = (pages.length-1)/2;
            result += pages.slice(middle, middle+1)[0];
        } else {
            incorrect.push(spool);
        }
    }

    return [result, incorrect];
}

function part_two(rules,incorrect) {
    let result = 0;

    for(let i = 0;i<incorrect.length;i++){
        let pages = incorrect[i].split(',').map(m => parseInt(m));
        let correct = true;
        do{
            correct = true;
            for (let i = 1; i < pages.length; i++) {
                //check si notre numéro fait partie d'une règle ou il est "avant"
                let foundRules = rules.filter((e) => e.before == pages[i]);
                if (foundRules) {
                    //si le numéro de la règle 'après' se trouve avant dans notre spool, alors erreur !
                    for (let rule of foundRules) {
                        let index = pages.slice(0, i).findIndex((elem) => elem == rule.last);
                        if (index != -1) {
                            // console.log('insertion de', rule.before, 'avant', pages[index]);
                            pages.splice(i, 0, pages.splice(index, 1)[0]);
                            correct = false;
                            break;
                        }
                    }
                }
            }
        } while (!correct)
            
        // console.log('pages :>> ', pages.join(','));
        let middle = (pages.length - 1) / 2;
        result += pages.slice(middle, middle + 1)[0];
    }
    return result;
}

main();
