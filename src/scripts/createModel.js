// trainModel.js
const { NlpManager } = require('node-nlp');
const path = require('path');

const manager = new NlpManager({ languages: ['en'], forceNER: false });

// ✅ Chart-related intent examples
manager.addDocument('en', 'show me a chart', 'chart_command');
manager.addDocument('en', 'plot a graph', 'chart_command');
manager.addDocument('en', 'generate a sales chart', 'chart_command');
manager.addDocument('en', 'create a line graph', 'chart_command');
manager.addDocument('en', 'display revenue trend', 'chart_command');
manager.addDocument('en', 'make a bar chart', 'chart_command');
manager.addDocument('en', 'render the monthly report as a graph', 'chart_command');
manager.addDocument('en', 'chart the income data', 'chart_command');
manager.addDocument('en', 'visualize profit over time', 'chart_command');
manager.addDocument('en', 'can you chart this?', 'chart_command');

// ✅ Non-chart (other) intent examples
manager.addDocument('en', 'log me out', 'other');
manager.addDocument('en', 'what time is it?', 'other');
manager.addDocument('en', 'send me the report', 'other');
manager.addDocument('en', 'hello', 'other');
manager.addDocument('en', 'hi there', 'other');
manager.addDocument('en', 'hey', 'other');
manager.addDocument('en', 'good morning', 'other');
manager.addDocument('en', 'how are you?', 'other');
manager.addDocument('en', 'thank you', 'other');
manager.addDocument('en', 'that is great', 'other');
manager.addDocument('en', 'okay cool', 'other');
manager.addDocument('en', 'can you help me?', 'other');
manager.addDocument('en', 'I need assistance', 'other');
manager.addDocument('en', 'who are you?', 'other');
manager.addDocument('en', 'tell me a joke', 'other');
manager.addDocument('en', 'bye', 'other');
manager.addDocument('en', 'exit', 'other');

async function trainAndSave() {
  await manager.train();
  manager.save(path.resolve(__dirname, '../models/intentmodel.nlp'));
  console.log('✅ Intent model trained and saved!');
}

trainAndSave();
