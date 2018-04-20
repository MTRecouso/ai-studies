const values = [{x1: 0.0, x2: 0.0}, {x1: 1.0, x2: 0.0}, {x1: 0.0, x2: 1.0}, {x1: 1.0, x2: 1.0}]
let weight1 = 1
let weight2 = 1

const step = (valor1, weight1, valor2, weight2, threshold) => weight1*valor1 + weight2*valor2 > threshold ? 1 : 0

let threshold = 1.5
values.forEach(function(value){
    console.log("AND Gate: F = (x1 = " + value.x1 +") AND (x2 = " + value.x2 + ") = " + step(value.x1, weight1, value.x2, weight2, threshold))
});



threshold = 0.5
console.log("\n")
values.forEach(function(value){
    console.log("OR Gate: F = (x1 = " + value.x1 +") OR (x2 = " + value.x2 + ") = " + step(value.x1, weight1, value.x2, weight2, threshold))
});

threshold = -1.5
weight1 = -1
weight2 = -1
console.log("\n")
values.forEach(function(value){
    console.log("NAND Gate: F = (x1 = " + value.x1 +") NAND (x2 = " + value.x2 + ") = " + step(value.x1, weight1, value.x2, weight2, threshold))
});


threshold = -0.5
weight1 = -1
weight2 = -1
console.log("\n")
values.forEach(function(value){
    console.log("NOR Gate: F = (x1 = " + value.x1 +") NOR (x2 = " + value.x2 + ") = " + step(value.x1, weight1, value.x2, weight2, threshold))
});