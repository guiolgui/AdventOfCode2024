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

function compare_lines(a1,b1,a2,b2) {
    
    // ab' - a'b différent de 0 < -> (S) admet un unique couple solution
    // ab' - a'b = 0 < -> soit(S) n'admet aucun couple solution
    // soit(S) admet une infinité de couples solutions
    if(a1*b2 - a2*b1 != 0) {
        console.log("✔️  One solution");        
        return true;
    } else {
        //same ❎ but in red ?
        console.log("❌  No solution");        
        return false;
    }
}

function solve_equation(a1,b1,c1,a2,b2,c2){
    if (compare_lines(a1, b1, a2, b2)){
        let gcd1 = gcd(a1, b1);
        let gcd2 = gcd(a2, b2);
        if (c1 % gcd1 != 0) {
            console.log("❌ GCD 1:", gcd1, " not compatible with c1:", c1);
            return [0,0];
        }
        if (c2 % gcd2 != 0) {
            console.log("❌ GCD 2:", gcd2," not compatible with c2:",c2);
            return [0, 0];
        }
        let y = (a1*c2 - a2*c1) / (a1*b2 - a2*b1);
        let x = (c1 - b1*y) / a1;
        return [x, y];
    }
}
const configMachine = [
    { mId:1,xA: 94, xB: 22, xG: 8400, yA : 34,yB : 67,yG : 5400 },
    { mId:2,xA: 26, xB: 67, xG: 12748, yA: 66, yB: 21, yG: 12176 },
    { mId:3,xA: 17, xB: 84, xG: 7870, yA: 86, yB: 37, yG: 6450 },
    { mId:4,xA: 69, xB: 27, xG: 18641, yA: 23, yB: 71, yG: 10279 }
];
let totalCost = 0;
configMachine.forEach(m => {
    //log sepearator line
    console.log('='.repeat(50));
    console.log('🚀 Machine : ',m.mId);
    let [x, y] = solve_equation(m.xA, m.xB, m.xG, m.yA, m.yB, m.yG);
    totalCost += x*3 + y*1;
    console.log(`Final result = ${[x, y]} cost = ${x*3 + y*1}`);
});
console.log(`💰 Coût final ${totalCost}`);
