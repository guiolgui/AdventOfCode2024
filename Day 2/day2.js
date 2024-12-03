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
    for(let line of t){
        let reports = line.split(' ');
        const checkResult = check_reports(reports);
        if (checkResult[0]){
            result++;
        } else {
            // console.log('line=>',line);
            // console.log('checkResult[1] :>> ', checkResult[1]);
        }
    }
    return result;
}

function part_two(t) {
    let err=0;
    let result = 0;
    for (let line of t) {
        // console.log('line :>> ', line);
        let reports = line.split(' ');
        let checkResult = check_reports(reports);
        if (checkResult[0]) {
            result++;
        } else {
            let idError = checkResult[1];
            
            for(let i of [-1,0,1]){
                let correctedReport = [...reports];
                let spliced = correctedReport.splice(idError + i, 1);
                // console.log('spliced[0] :>> ', spliced[0]);
                checkResult = check_reports(correctedReport);
                if (checkResult[0]) {
                    result++;
                    break;
                }
            }
        }
    }
    return result;
}

function check_reports(reports){
    let safe = true;
    let positive = reports[1] - reports[0] >= 0;
    let i;
    for (i = 1; i < reports.length; i++) {
        let interval = reports[i] - reports[i - 1];
        if (
            interval == 0 ||
            (interval < -3 || interval > 3) ||
            (positive && interval < 0) ||
            (!positive && interval > 0)
        ) {
            safe = false;
            break;
        }
    }
    return [safe,i-1];
}

main();
