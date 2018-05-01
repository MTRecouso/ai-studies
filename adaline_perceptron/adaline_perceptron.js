let weights = [
    [-2.4013],
    [0.393],
    [1.902],
    [0.429]
];

const learning_rate = 0.000027

const generateSignals = (x, y, z, weights) => {
    const signal_1 = Array(300).fill(0).map((value, index) => x(index))
    const signal_2 = Array(300).fill(0).map((value, index) => y(index))
    const signal_3 = Array(300).fill(0).map((value, index) => z(index))
    return {
        signal_1,
        signal_2,
        signal_3
    }

}

const signals = generateSignals(((i) => Math.sin(i * Math.PI / 180)), ((i) => Math.cos(i * Math.PI / 180)), ((i) => (i * Math.PI / 180)), weights)
const signal_1 = signals.signal_1
const signal_2 = signals.signal_2
const signal_3 = signals.signal_3
const desired_signal = Array(300).fill(0).map((value, index) => -Math.PI + 0.565 * signal_1[index] + 2.657 * signal_2[index] + 0.674 * signal_3[index])

const learnStep = (weights) => {
    let linear_combination = [];
    for (let index = 0; index < 300; index++) {
        linear_combination[index] = weights[0][0] + weights[1][0] * signal_1[index] + weights[2][0] * signal_2[index] + weights[3][0] * signal_3[index]
        weights[0][0] = weights[0][0] + learning_rate * Math.pow((desired_signal[index] - linear_combination[index]), 2.0) * 0.5;
        weights[1][0] = weights[1][0] + learning_rate * Math.pow((desired_signal[index] - linear_combination[index]), 2.0) * 0.5 * signal_1[index]
        weights[2][0] = weights[2][0] + learning_rate * Math.pow((desired_signal[index] - linear_combination[index]), 2.0) * 0.5 * signal_2[index]
        weights[3][0] = weights[3][0] + learning_rate * Math.pow((desired_signal[index] - linear_combination[index]), 2.0) * 0.5 * signal_3[index]
    }

    return weights
}

const perceptronTest = (weights, signal_1, signal_2, signal_3) => {
    let linear_combination = [];
    for (let index = 0; index < 300; index++) {
        linear_combination[index] = weights[0][0] + weights[1][0] * signal_1[index] + weights[2][0] * signal_2[index] + weights[3][0] * signal_3[index]
    }
    return linear_combination
}

const createChart = (perceptron_signal, desired_signal, chart_name) => {
    var ctx = document.getElementById(chart_name).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: perceptron_signal.map((value, index) => ""),
            datasets: [{
                    label: "Perceptron signal",
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    data: perceptron_signal,
                    radius: 0
                },
                {
                    label: "Desired signal",
                    fill: false,
                    borderColor: 'green',
                    data: desired_signal,
                    radius: 0
                }
            ]
        },
        options: {}
    });
}

//Other linear combinations using the weights of the learning process
for (let n = 0; n < 32; n++) {
    weights = learnStep(weights)
}


const perceptron_signal = perceptronTest(weights, signal_1, signal_2, signal_3)

createChart(perceptron_signal, desired_signal, "testChart")

const test_values_a = generateSignals (((i) => Math.sin(i*Math.PI/180)*0.8), ((i) => Math.cos(i*Math.PI/180)*0.9), ((i) => (i*Math.PI/180)*1.1), weights)
const test_signal_a = perceptronTest(weights, test_values_a.signal_1, test_values_a.signal_2, test_values_a.signal_3);
createChart(test_signal_a, desired_signal , "testChartA")

const test_values_b = generateSignals (((i) => Math.sin(i*Math.PI/180)), ((i) => Math.cos(i*Math.PI/180)), ((i) => (i*Math.PI/180)*Math.random()), weights)
const test_signal_b = perceptronTest(weights, test_values_b.signal_1, test_values_b.signal_2, test_values_b.signal_3);
createChart(test_signal_b, desired_signal, "testChartB")