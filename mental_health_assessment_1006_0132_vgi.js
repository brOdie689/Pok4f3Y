// 代码生成时间: 2025-10-06 01:32:21
const readline = require('readline');

// Define possible mental health states
const mentalHealthStates = {
  "0": "Normal",
  "1": "Anxious",
  "2": "Depressed",
  "3": "Stressed"
};

// Function to perform assessment based on input
function assessMentalHealth(input) {
  // Error handling for invalid input
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input type, expected a string.');
  }

  // Convert input to a number and perform assessment
  const score = parseInt(input, 10);
  if (isNaN(score)) {
    throw new Error('Invalid score, expected a numeric value.');
  }

  // Define mental health score thresholds
  const thresholds = [0, 10, 20, 30];

  // Perform assessment based on thresholds
  if (score < thresholds[0]) {
    return mentalHealthStates[0];
  } else if (score >= thresholds[0] && score < thresholds[1]) {
    return mentalHealthStates[1];
  } else if (score >= thresholds[1] && score < thresholds[2]) {
    return mentalHealthStates[2];
  } else {
    return mentalHealthStates[3];
  }
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for mental health score
rl.question('Please enter your mental health score (0-30): ', (input) => {
  try {
    // Perform assessment and display result
    const result = assessMentalHealth(input);
    console.log(`Your mental health state is: ${result}`);
  } catch (error) {
    // Handle any errors that occur during assessment
    console.error(error.message);
  } finally {
    // Close readline interface
    rl.close();
  }
});