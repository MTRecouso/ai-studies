let weights = [
    [-0.212, 0.9262, -0.5023]
];
const bias = -1
const decline_inputs = [
    [10, 2],
    [6, 3],
    [8, 7],
    [7, 5],
    [2, 1]
]
const decline_output = 0

const improvement_inputs = [
    [2, 3],
    [5, 9],
    [0, 2],
    [6, 6],
    [3, 4]
]
const improvement_output = 1
const threshold = 0
const learning_rate = 0.1

const learnStep = (weights, input, desired_output) => {
    let dot_product = 0
    dot_product += bias * weights[0][0];

    for(let index = 0, length = input.length; index < length; index++){
       dot_product += input[index] * weights[0][index + 1] 
    }

    const output = dot_product > threshold ? 1 : 0

    weights[0][0] += learning_rate * (desired_output - output) * bias

    for(let index = 0, length = input.length; index < length; index++){
       weights[0][index + 1] += learning_rate * (desired_output - output) * input[index]
    }

    return output
}

let n = 0
console.log("Initial weights: " + weights + "\n")
while (n < 75) {

    //normaliza os valores
    const normalized_decl_inputs = decline_inputs.map(value => [(value[0] / 10), (value[1] / 10)])
    const normalized_impr_inputs = improvement_inputs.map((value) => [(value[0] / 10), (value[1] / 10)])

    for(let index = 0, length = normalized_decl_inputs.length;  index < length; index++){
        learnStep(weights, normalized_decl_inputs[index], decline_output)
        learnStep(weights, normalized_impr_inputs[index], improvement_output)
    }
    n++
}
console.log("Final weights: " + weights)


const perceptronTest = (input) => {

    let dot_product = 0
    dot_product += bias * weights[0][0];


    for(let index = 0, length = input.length; index < length; index++){
        dot_product += input[index] * weights[0][index + 1]
        console.log(input[index])
    }

    const output = dot_product > threshold ? 1 : 0

    console.log(output == 0 ? "Decline" : "Improvement or stagnation")
    console.log("\n")
}

console.log("\n ------Test ------------ \n")

const test_inputs = [
    [0.5, 0.3],
    [0.9, 1],
    [1.0, 0.0],
    [0.2, 0.3],
    [0.45, 0.5],
    [0.75, 0.7]
]

for(let index = 0, length = test_inputs.length; index < length; index++){
    perceptronTest(test_inputs[index])
}