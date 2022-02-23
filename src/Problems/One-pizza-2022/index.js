const fs = require('fs');
// let file = 'a_an_example.in.txt';
// let file = 'b_basic.in.txt';
// let file = 'c_coarse.in.txt';
// let file = 'd_difficult.in.txt';
let file = 'e_elaborate.in.txt';
let input = fs.readFileSync(`input/${file}`, 'utf-8').split('\n').map(line => line.split(' '));
const clientsLength = parseInt(input[0], 10);

input = input.slice(1);
let clients = [];
for (let i = 0; i < clientsLength; i++) {
    clients.push({
        liked: input[2 * i].slice(1),
        likes: parseInt(input[2 * i][0]),
        disliked: input[2 * i + 1].slice(1),
        dislikes: parseInt(input[2 * i + 1][0]),
    })
}

let allIngredients = clients.reduce((acc,cur) => {
    acc = [...new Set([...acc, ...cur.liked, ...cur.disliked])];
    return acc;
}, []);

let output = [];
clients
.sort((a, b) => a.dislikes - b.dislikes)
.forEach(client => {
    if (client.disliked.every(e => !output.includes(e))) {
        output = [...new Set([...output, ...client.liked])];
    }
})

let bestScore = simulator(output);

let i = -1;
while(true) {
    i++
    let testOutput = output.slice();
    if (i%2 == 0) {
        testOutput.splice(Math.floor(Math.random()*testOutput.length), 1);
    }
    else {
        let remainingIngredients = allIngredients.filter(e=> !testOutput.includes(e));
        testOutput.push(remainingIngredients[Math.floor((Math.random()*remainingIngredients.length))]);
    }
    let testScore = simulator(testOutput);
    console.log({testScore, bestScore});
    if (testScore > bestScore) {
        console.log("BETTER");
        output = testOutput;
        bestScore = testScore
        fs.writeFileSync(`output/output-${file}`, `${testOutput.length} ${testOutput.join(' ')}`);
    }
}


function simulator(output) {
    let score = 0;
    clients.forEach(client => {
        if (
            client.liked.every(e => output.includes(e))
            && client.disliked.every(e => !output.includes(e))
        ) {
            score++;
        }
    })
    return score;
}
