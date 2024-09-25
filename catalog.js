// Function to read the input JSON file
const fs = require('fs');
const math = require('mathjs');

// Function to read the input JSON file
function readInput(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Function to decode y-values from different bases
function decodeValue(value, base) {
    return parseInt(value, base); // Convert value to base-10
}

// Function to perform Lagrange interpolation to find the constant term
function lagrangeInterpolation(points) {
    const k = points.length;
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= (0 - xj) / (xi - xj); // Interpolation formula
            }
        }
        constantTerm += term;
    }

    return constantTerm;
}

// Main function to execute the logic
// Main function to execute the logic
function findConstantTerm(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;

    // Parse the points (x, y) from the JSON input
    const points = [];
    const keys = Object.keys(jsonData).filter(key => key !== 'keys'); // Exclude 'keys' object

    for (let i = 0; i < n; i++) {
        const key = keys[i]; // Get the i-th key
        console.log(`Trying to access key: ${key}`);
        const base = parseInt(jsonData[key].base);  // Access using the key
        const value = jsonData[key].value;
        const y = decodeValue(value, base);
        points.push([parseInt(key), y]); // x is the key (converted to number), y is the decoded value
    }

    // Use Lagrange interpolation to find the constant term 'c'
    const constantTerm = lagrangeInterpolation(points.slice(0, k));
    return constantTerm;
}

// Example usage
const jsonData = readInput('input.json');
const secret = findConstantTerm(jsonData);
console.log('The constant term (secret) is:', secret);
