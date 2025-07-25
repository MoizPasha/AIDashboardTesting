// src/scripts/checkModel.js
const { NlpManager } = require('node-nlp');
const readline = require('readline');
const path = require('path');

// Create a new NLP manager instance and load the trained model
const manager = new NlpManager({ languages: ['en'], forceNER: false });

async function loadModel() {
  const modelPath = path.resolve(__dirname, '../models/intentmodel.nlp');
  await manager.load(modelPath);
  console.log('✅ Model loaded from:', modelPath);
}

// Function to get intent from input
async function classifyInput(input) {
  const response = await manager.process('en', input);
  const score = response.score || 0;

  console.log(`🤖 Intent: ${response.intent}`);
  console.log(`🤖 Confidence: ${score.toFixed(2)}`);
}

// Interactive CLI
async function start() {
  await loadModel();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'You: '
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (input.toLowerCase() === 'exit') {
      rl.close();
    } else {
      await classifyInput(input);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log('\n👋 Exiting.');
    process.exit(0);
  });
}

start();
